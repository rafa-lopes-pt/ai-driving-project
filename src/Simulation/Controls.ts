export enum ControlMode {
    "STATIONARY", //Car doesnt move
    "CPU", //Controlled by cpu
    "P1", //player 1
    // "P2", add support for wasd
    "AI",
}

export default class Controls {
    private _forward: boolean;
    private _left: boolean;
    private _right: boolean;
    private _reverse: boolean;

    constructor(mode: ControlMode = ControlMode.STATIONARY) {
        this._forward = false;
        this._left = false;
        this._right = false;
        this._reverse = false;
        switch (mode) {
            case ControlMode.P1:
                this.addKeyboardListeners();
                break;
            case ControlMode.CPU: {
                this._forward = true;
                break;
            }
        }
    }

    private addKeyboardListeners() {
        document.onkeydown = (e: KeyboardEvent) => {
            switch (e.code) {
                case "ArrowUp":
                    this._forward = true;
                    break;
                case "ArrowLeft":
                    this._left = true;
                    break;
                case "ArrowRight":
                    this._right = true;
                    break;
                case "ArrowDown":
                    this._reverse = true;
                    break;
            }
        };
        document.onkeyup = (e: KeyboardEvent) => {
            switch (e.code) {
                case "ArrowUp":
                    this._forward = false;
                    break;
                case "ArrowLeft":
                    this._left = false;
                    break;
                case "ArrowRight":
                    this._right = false;
                    break;
                case "ArrowDown":
                    this._reverse = false;
                    break;
            }
        };
    }
    //
    toString() {
        return JSON.stringify(this);
    }

    public get forward() {
        return this._forward;
    }
    public get left() {
        return this._left;
    }
    public get right() {
        return this._right;
    }
    public get reverse() {
        return this._reverse;
    }
    public set forward(x: boolean) {
        this._forward = x;
    }
    public set left(x: boolean) {
        this._left = x;
    }
    public set right(x: boolean) {
        this._right = x;
    }
    public set reverse(x: boolean) {
        this._reverse = x;
    }
}
