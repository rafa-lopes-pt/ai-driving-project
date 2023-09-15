import Controls, { ControlMode } from "./Controls";
import NeuralNetwork from "./NeuralNetwork";
import Sensors from "./Sensors";
import {
    Coordinate2DType,
    isPolysIntersection,
    SegmentType,
    getRandomColor,
} from "./utils";
export default class Car {
    private _x: number;
    private _y: number;
    private width: number;
    private height: number;
    private sensors: Sensors | undefined;
    private controls: Controls;
    private img: HTMLImageElement;
    private mask: HTMLCanvasElement;
    //speed
    private speed: number;
    private aceleration: number;
    private friction: number;
    private max_speed: number;
    //steering
    private _angle: number;

    //polygon update
    private _polygon: Coordinate2DType[];

    //Collision
    private _isDamaged: boolean;

    //AI - Neural Network
    private _brain: NeuralNetwork | undefined;
    private _controlMode: ControlMode;

    constructor({
        x,
        y,
        width,
        height,
        controlMode = ControlMode.AI,
        maxSpeed = 3,
        color = getRandomColor(),
        sensorOptions,
    }: {
        x: number;
        y: number;
        width: number;
        height: number;
        controlMode?: ControlMode;
        maxSpeed?: number;
        color?: string;
        sensorOptions?: {
            rayLength: number;
            rayCount: number;
            raySpread: number;
        };
    }) {
        this._x = x;
        this._y = y;
        this.width = width;
        this.height = height;
        this._controlMode = controlMode;
        this.controls = new Controls(this._controlMode);
        if (
            controlMode != ControlMode.STATIONARY &&
            controlMode != ControlMode.CPU
        )
            this.sensors = new Sensors(this, sensorOptions);
        if (controlMode === ControlMode.AI && this.sensors)
            this._brain = new NeuralNetwork([this.sensors.rayCount, 6, 4]);
        this.speed = 0;
        this.aceleration = 0.2;
        this.friction = 0.05;
        this.max_speed = maxSpeed;
        this._angle = 0;
        this._polygon = this.createPolygon();
        this._isDamaged = false;

        this.img = new Image();
        this.img.src = "./media/car.png";
        this.mask = document.createElement("canvas");
        this.mask.width = width;
        this.mask.height = height;

        const maskCtx = this.mask.getContext("2d");
        if (maskCtx) {
            this.img.onload = () => {
                maskCtx.fillStyle = color;
                maskCtx.rect(0, 0, this.width, this.height);
                maskCtx.fill();

                maskCtx.globalCompositeOperation = "destination-atop";
                maskCtx.drawImage(this.img, 0, 0, this.width, this.height);
            };
        }
    }
    draw(ctx: CanvasRenderingContext2D | null, drawSensors = false) {
        if (!ctx) throw new Error("Canvas 2D context can't be null");

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        if (!this.isDamaged) {
            ctx.drawImage(
                this.mask,
                -this.width / 2,
                -this.height / 2,
                this.width,
                this.height
            );
            ctx.globalCompositeOperation = "multiply";
        }
        ctx.drawImage(
            this.img,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.restore();

        if (this.sensors && drawSensors) this.sensors.draw(ctx);
    }
    update(borders: SegmentType[], traffic: Car[]) {
        if (!this._isDamaged) {
            this.move();
            this._polygon = this.createPolygon();
            this._isDamaged = this.assessDamage(borders, traffic);
        }

        if (this.sensors && this._brain) {
            this.sensors.update(borders, traffic);
            const offsets = this.sensors.readings.map((s) =>
                s === null ? 0 : 1 - (s?.offset as number)
            );

            const outputs = NeuralNetwork.feedForward(offsets, this._brain);

            this.controls.forward = Boolean(outputs[0]);
            this.controls.left = Boolean(outputs[1]);
            this.controls.right = Boolean(outputs[2]);
            this.controls.reverse = Boolean(outputs[3]);
        }
    }
    private move() {
        //================================= Aceleration
        if (this.controls.forward) {
            this.speed += this.aceleration;
        }
        if (this.controls.reverse) {
            this.speed -= this.aceleration;
        }
        //================================= Max Speed
        if (this.speed > this.max_speed) {
            this.speed = this.max_speed;
        }
        if (this.speed < -this.max_speed / 2) {
            //moving in reverse (max reverse speed is less than actual max speed)
            this.speed = -this.max_speed / 2;
        }
        //================================= Friction
        if (this.speed > 0) this.speed -= this.friction;
        if (this.speed < 0) this.speed += this.friction;
        //Stopping the car
        //Due to friction, the car will never stop, because we didnt specify how to reach speed = 0
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        //
        //================================= Steering
        if (this.speed !== 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) {
                this._angle += 0.03 * flip;
            }
            if (this.controls.right) {
                this._angle -= 0.03 * flip;
            }
        }
        this._x -= Math.sin(this._angle) * this.speed;

        //================================= Update the vertical position based on the calculated speed & angle
        this._y -= Math.cos(this._angle) * this.speed;
    }

    private createPolygon(): Coordinate2DType[] {
        const points = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
        });
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
        });
        return points;
    }

    private assessDamage(borders: SegmentType[], traffic: Car[]) {
        //Loop through all the borders and check for an intersection between border points and polygon(car) points
        for (let i = 0; i < borders.length; i++) {
            if (isPolysIntersection(this._polygon, borders[i])) return true;
        }
        //Loop through all the cars and check for an intersection between car points and polygon(car) points
        for (let i = 0; i < traffic.length; i++) {
            if (isPolysIntersection(this._polygon, traffic[i]._polygon))
                return true;
        }
        return false;
    }

    //

    public get y(): number {
        return this._y;
    }

    public get x(): number {
        return this._x;
    }

    public get angle(): number {
        return this._angle;
    }
    public get polygon(): Coordinate2DType[] {
        return this._polygon;
    }

    public get brain() {
        return this._brain;
    }

    public get isDamaged() {
        return this._isDamaged;
    }

    //

    public set brain(x: NeuralNetwork | undefined) {
        this._brain = x;
    }
}
