import { lerp } from "./utils";

export default class NeuralNetwork {
    levels: Level[];
    constructor(neuronCounts: number[]) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }
    }

    static feedForward(givenInputs: number[], network: NeuralNetwork) {
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    }

    static mutate(network: NeuralNetwork | undefined, amount = 1) {
        if (!network) {
            console.log("No Network to Mutate");
            return;
        }
        network.levels.forEach((level) => {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i] = lerp(
                    level.biases[i],
                    Math.random() * 2 - 1,
                    amount
                );
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random() * 2 - 1,
                        amount
                    );
                }
            }
        });
    }

    static fromObj(levels: Level[]) {
        //  console.log("DATA", levels);
        if (levels) {
            let n = new NeuralNetwork([]);
            for (let l of levels) {
                const nL = Level.fromObj(l);
                if (nL instanceof Level) n.levels.push(nL);
            }

            return n;
        }
    }
    static clone(neuralNetwork: NeuralNetwork) {
        const n = new NeuralNetwork([]);
        for (let l of neuralNetwork.levels) {
            const nL = new Level(0, 0);
            nL.biases = [...l.biases];
            nL.inputs = [...l.inputs];
            nL.outputs = [...l.outputs];
            nL.weights = new Array(l.weights.length);
            for (let i = 0; i < l.weights.length; i++) {
                nL.weights[i] = [...l.weights[i]];
            }
            n.levels.push(nL);
        }
        return n;
    }
}

//Single neural network level!
class Level {
    inputs: number[];
    outputs: number[];
    biases: number[];
    weights: number[][];

    constructor(inputCount: number, outputCount: number) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount);
        }

        Level.randomize(this);
    }

    static randomize(level: Level) {
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }

        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    static feedForward(givenInputs: number[], level: Level) {
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }

        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }

            if (sum > level.biases[i]) {
                level.outputs[i] = 1;
            } else {
                level.outputs[i] = 0;
            }
        }

        return level.outputs;
    }

    static fromObj({
        inputs,
        outputs,
        biases,
        weights,
    }: {
        inputs: number[];
        outputs: number[];
        biases: number[];
        weights: number[][];
    }) {
        const l = new Level(inputs.length, outputs.length);
        l.inputs = inputs;
        l.outputs = outputs;
        l.biases = biases;
        l.weights = weights;
        return l;
    }
}
