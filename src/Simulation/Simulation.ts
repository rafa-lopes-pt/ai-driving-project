import Car from "./Car";
import NeuralNetwork from "./NeuralNetwork";
import Road from "./Road";
import {
    generateHeavyTraffic,
    generateLowTraffic,
    generateMediumTraffic,
} from "./Traffic";

export enum TRAFFIC_MODES {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HEAVY = "HEAVY",
}

export type SimulationInputsType = {
    mutationRatio: number;
    trafficMode: TRAFFIC_MODES;
    carCount: number;
    rayCount: number;
    rayLength: number;
    raySpread: number;
};

export default class Simulation {
    road: Road;
    traffic: Car[];
    cars: Car[];
    inputs: SimulationInputsType;
    activeCars: number;
    bestBrain: NeuralNetwork | undefined;
    isReadingStoredData: boolean;

    constructor({
        roadWidth,
        inputs,
        bestBrain,
    }: {
        roadWidth: number;
        inputs: SimulationInputsType;
        bestBrain?: NeuralNetwork;
    }) {
        this.inputs = { ...inputs };
        if (bestBrain) {
            this.isReadingStoredData = true;
            this.bestBrain = NeuralNetwork.clone(bestBrain);
        } else {
            this.isReadingStoredData = false;
            this.bestBrain = undefined;
        }

        switch (inputs.trafficMode) {
            case TRAFFIC_MODES.LOW: {
                const { road, traffic } = generateLowTraffic(roadWidth);
                this.road = road;
                this.traffic = traffic;
                break;
            }
            case TRAFFIC_MODES.MEDIUM: {
                const { road, traffic } = generateMediumTraffic(roadWidth);
                this.road = road;
                this.traffic = traffic;
                break;
            }
            case TRAFFIC_MODES.HEAVY: {
                const { road, traffic } = generateHeavyTraffic(roadWidth);
                this.road = road;
                this.traffic = traffic;
                break;
            }
        }

        this.cars = this.generateCars(this.inputs.carCount);

        //Mutation
        if (this.bestBrain) {
            for (let i = 0; i < this.cars.length; i++) {
                this.cars[i].brain = NeuralNetwork.clone(this.bestBrain);

                if (i != 0) {
                    NeuralNetwork.mutate(
                        this.cars[i].brain,
                        this.inputs.mutationRatio
                    );
                }
            }
        }

        this.activeCars = this.inputs.carCount;
    }

    private generateCars(n: number) {
        const cars = [];
        const { rayCount, rayLength, raySpread } = this.inputs;

        for (let i = 0; i < n; ++i) {
            cars.push(
                new Car({
                    x: this.road.getLaneCenter(1),
                    y: 100,
                    width: Math.min(30, this.road.laneWidth * 0.9),
                    height: 50,
                    sensorOptions: { rayCount, rayLength, raySpread },
                })
            );
        }

        return cars;
    }

    updateActiveCars() {
        //IMPROVE: create function to determine if car should be rendered
        /*
                car.isDamaged
                car.y  >  tcar[x].find(max y OR  x=0 ) + car.height*1.5
                car.speed <= 0
                etc

                These cars dont matter

                NOTE:These r called fitness functions!!!
            */
        this.activeCars = this.cars.filter((c) => !c.isDamaged).length;
    }

    findBestCar() {
        const c = this.cars.find(
            (c) =>
                c.y ===
                Math.min(
                    ...this.cars.filter((c) => !c.isDamaged).map((c) => c.y)
                )
        );

        this.bestBrain = c?.brain;
        // console.log("findBest", c);

        return c;
    }
}
