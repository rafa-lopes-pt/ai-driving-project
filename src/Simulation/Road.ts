import { Coordinate2DType, SegmentType } from "./utils";
export default class Road {
    private offset: number;
    private width: number;
    private _laneCount: number;
    private _laneWidth: number;
    private left: number;
    private right: number;
    private top: number;
    private bottom: number;
    //
    private INFINITY = 1000000; //js already has a infinity const, but apparently in this case this is better cz of bugs...
    //
    private topLeft: Coordinate2DType;
    private topRight: Coordinate2DType;
    private bottomLeft: Coordinate2DType;
    private bottomRight: Coordinate2DType;
    borders: SegmentType[];
    //
    constructor(width: number, paddingRatio: number, laneCount = 4) {
        this.offset = (width * (1 - paddingRatio)) / 2;
        this.width = width * paddingRatio;
        this._laneCount = laneCount;
        this._laneWidth = this.width / this._laneCount;
        this.left = this.offset;
        this.right = this.width;
        this.top = -this.INFINITY;
        this.bottom = this.INFINITY;
        //
        this.topLeft = { x: this.left, y: this.top };
        this.topRight = { x: this.right, y: this.top };
        this.bottomLeft = { x: this.left, y: this.bottom };
        this.bottomRight = { x: this.right, y: this.bottom };
        this.borders = [
            [this.topLeft, this.bottomLeft],
            [this.topRight, this.bottomRight],
        ];
    }

    getLaneCenter(laneIndex: number) {
        return (
            this.offset +
            this._laneWidth *
                Math.max(0, Math.min(this._laneCount - 1, laneIndex)) +
            this._laneWidth / 2
        );
    }

    draw(ctx: CanvasRenderingContext2D | null) {
        if (!ctx) throw new Error("Canvas 2D context can't be null");
        ctx.lineWidth = 5;
        ctx.strokeStyle = "White";

        //middle lanes
        for (let i = 1; i <= this._laneCount - 1; i++) {
            ctx.setLineDash([20, 20]);

            this.drawRoadLines(
                ctx,
                this.width * (i / this._laneCount) + this.offset
            );
        }
        //Borders
        ctx.setLineDash([]);
        this.borders.forEach((border) => {
            ctx.beginPath();
            ctx.moveTo(border[0].x, border[0].y);
            ctx.lineTo(border[1].x, border[1].y);
            ctx.stroke();
        });
    }
    private drawRoadLines(ctx: CanvasRenderingContext2D, x: number) {
        ctx.beginPath();
        ctx.moveTo(x, this.top);
        ctx.lineTo(x, this.bottom);
        ctx.stroke();
    }

    //

    public get laneWidth(): number {
        return this._laneWidth;
    }
    public get laneCount(): number {
        return this.laneCount;
    }
}
