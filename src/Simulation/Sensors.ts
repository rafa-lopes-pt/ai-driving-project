import Car from "./Car";
import { IntersectionType,lerp,getIntersection,SegmentType } from "./utils";
export default class Sensors {
    private car: Car;
    private _rayCount: number;
    private _rayLength: number;
    private _raySpread: number;
    private rays: SegmentType[];
    private _readings: (IntersectionType | null)[];

    constructor(
        car: Car,
        options?: {
            rayLength: number;
            rayCount: number;
            raySpread: number;
        }
    ) {
        this.car = car;
        this._rayCount = options?.rayCount || 20;
        this._rayLength = options?.rayLength || 150;
        this._raySpread = Math.PI / (options?.raySpread || 2);

        this.rays = [];
        this._readings = [];
    }

    update(borders: SegmentType[], traffic: Car[]) {
        this.castRays();
        this._readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(this.getReading(this.rays[i], borders, traffic));
        }
    }

    getReading(ray: SegmentType, borders: SegmentType[], traffic: Car[]) {
        let touches = [];

        for (let i = 0; i < borders.length; i++) {
            const touch = getIntersection(
                ray[0],
                ray[1],
                borders[i][0],
                borders[i][1]
            );
            if (touch) {
                touches.push(touch);
            }
        }

        for (let i = 0; i < traffic.length; i++) {
            const poly = traffic[i].polygon;
            for (let j = 0; j < poly.length; j++) {
                const value = getIntersection(
                    ray[0],
                    ray[1],
                    poly[j],
                    poly[(j + 1) % poly.length]
                );
                if (value) {
                    touches.push(value);
                }
            }
        }

        if (touches.length == 0) {
            return null; //NOTE: 1-null = 1 | 1-undefined = NaN   (See Car.ts update() ln87)
        } else {
            const offsets = touches.map((e) => e.offset);
            const minOffset = Math.min(...offsets);
            return touches.find(
                (e) => e.offset == minOffset
            ) as IntersectionType; // This will never be undefined cz we mapped the offsets first!
        }
    }

    castRays() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle =
                lerp(
                    this._raySpread / 2,
                    -this._raySpread / 2,
                    this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)
                ) + this.car.angle;

            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this._rayLength,
                y: this.car.y - Math.cos(rayAngle) * this._rayLength,
            };
            this.rays.push([start, end]);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.rayCount; i++) {
            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i] as IntersectionType;
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }
    }

    public get rayCount() {
        return this._rayCount;
    }
    public get readings() {
        return this._readings;
    }

    public set rayCount(x: number) {
        this._rayCount = x;
    }
    public set rayLength(x: number) {
        this._rayCount = x;
    }
    public set raySpread(x: number) {
        this._rayCount = x;
    }
}
