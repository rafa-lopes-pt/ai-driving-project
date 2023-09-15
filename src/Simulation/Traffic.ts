import Car from "./Car";
import { ControlMode } from "./Controls";
import Road from "./Road";

//IMPROVE: Add a method to randomly generate a traffic preset?

export const generateLowTraffic = (roadWidth: number) => {
    const road = new Road(roadWidth, 0.95, 3);

    const traffic = [
        new Car({
            x: road.getLaneCenter(1),
            y: -100,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),

        new Car({
            x: road.getLaneCenter(0),
            y: -300,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),

        new Car({
            x: road.getLaneCenter(2),
            y: -400,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
    ];
    return { road, traffic };
};

export const generateMediumTraffic = (roadWidth: number) => {
    const road = new Road(roadWidth, 0.95, 3);
    const traffic = [
        new Car({
            x: road.getLaneCenter(1),
            y: -100,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(0),
            y: -300,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(2),
            y: -300,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(0),
            y: -500,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(1),
            y: -500,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(1),
            y: -750,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(2),
            y: -750,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
    ];
    return { road, traffic };
};

export const generateHeavyTraffic = (roadWidth: number) => {
    const road = new Road(roadWidth, 0.95, 4);
    const traffic = [
        new Car({
            x: road.getLaneCenter(1),
            y: -100,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(0),
            y: -200,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(4),
            y: -350,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(1),
            y: -300,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(4),
            y: -500,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(0),
            y: -420,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(2),
            y: -550,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(3),
            y: -680,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
        new Car({
            x: road.getLaneCenter(1),
            y: -730,
            width: Math.min(30, road.laneWidth * 0.9),
            height: 50,
            controlMode: ControlMode.CPU,
            maxSpeed: 2,
        }),
    ];
    return { road, traffic };
};
