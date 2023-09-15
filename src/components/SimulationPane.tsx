import { MouseEventHandler, useEffect, useRef, useState } from "react";
import {
    Button,
    ButtonGroup,
    Col,
    Container,
    Form,
    OverlayTrigger,
    Row,
    Stack,
    ToggleButton,
    Tooltip,
} from "react-bootstrap";
import Simulation, {
    SimulationInputsType,
    TRAFFIC_MODES,
} from "../Simulation/Simulation";
import Visualizer from "../Simulation/Visualizer";

import NeuralNetwork from "../Simulation/NeuralNetwork";
import "./style.css";

import OPTIMAL_DATA from "../Simulation/optimalData";

export type SavedDataType = {
    neuralNetwork: NeuralNetwork | undefined;
    inputs: SimulationInputsType;
};

export default function SimulationPane({
    onClose,
}: {
    onClose: MouseEventHandler;
}) {
    // ====================================== CONFIG PANEL & INPUTS START

    // NETWORK
    const [mutationRatio, setMutationRatio] = useState(0.15);
    // TRAFFIC
    const [trafficMode, setTrafficMode] = useState(TRAFFIC_MODES.LOW);
    // CAR
    const [carCount, setCarCount] = useState(100);

    // SENSORS
    const [rayCount, setRayCount] = useState(5);
    const [rayLength, setRayLength] = useState(150);
    const [raySpread, setRaySpread] = useState(2);

    // ====================================== CONFIG PANEL & INPUTS END

    // ====================================== CANVAS

    const carCanvasRef = useRef<HTMLCanvasElement>(null);
    let carCanvas = carCanvasRef.current as unknown as HTMLCanvasElement;

    const networkCanvasRef = useRef<HTMLCanvasElement>(null);
    let networkCanvas =
        networkCanvasRef.current as unknown as HTMLCanvasElement;

    const [simulation, setSimulation] = useState<Simulation | undefined>(
        undefined
    );

    const [activeCars, setActiveCars] = useState(0);

    const STORAGE_KEY = "simulationData-";

    function save() {
        const d = JSON.stringify({
            neuralNetwork: simulation?.bestBrain,
            inputs: simulation?.inputs,
        });

        console.table(simulation?.bestBrain?.levels[0]);

        localStorage.setItem(STORAGE_KEY + simulation?.inputs.trafficMode, d);
    }
    function discard() {
        localStorage.removeItem(STORAGE_KEY + simulation?.inputs.trafficMode);
    }

    function loadSimulationData(
        mode: TRAFFIC_MODES,
        isOptimal = false
    ): SavedDataType | undefined {
        if (isOptimal) {
            return OPTIMAL_DATA[trafficMode];
        } else {
            const d = localStorage.getItem(STORAGE_KEY + mode);
            if (d) {
                const {
                    inputs,
                    neuralNetwork,
                }: {
                    inputs: SimulationInputsType;
                    neuralNetwork: { levels: any[] };
                } = JSON.parse(d);

                const n = NeuralNetwork.fromObj(neuralNetwork?.levels);
                if (n instanceof NeuralNetwork) {
                    return {
                        inputs,
                        neuralNetwork: n,
                    };
                }

                return {
                    inputs,
                    neuralNetwork: undefined,
                };
            }
        }
    }

    const [loadOptimalFlag, setLoadOptimalFlag] = useState(false);
    const [rerunTrigger, setRerunTrigger] = useState(false);

    function rerun() {
        setRerunTrigger((prev) => !prev);
    }

    let animID: number | undefined;
    useEffect(() => {
        carCanvas = carCanvasRef.current as unknown as HTMLCanvasElement;
        networkCanvas =
            networkCanvasRef.current as unknown as HTMLCanvasElement;
    }, []);
    useEffect(() => {
        if (carCanvas && networkCanvas && window.innerWidth > 1200) {
            // carCanvas.width = 200;
            carCanvas.height = window.innerHeight * 0.7;
            // networkCanvas.width = 500;
            networkCanvas.height = window.innerHeight * 0.95;

            const carCtx = carCanvas.getContext("2d");
            const networkCtx = networkCanvas.getContext("2d");

            const loadedData = loadSimulationData(trafficMode, loadOptimalFlag);
            // console.log(
            //     "Loaded",
            //     loadedData?.neuralNetwork,
            //     loadedData?.inputs
            // );

            let sim: Simulation | undefined;
            if (loadedData) {
                sim = new Simulation({
                    roadWidth: carCanvas.width,
                    inputs: { ...loadedData?.inputs, carCount: carCount },
                    bestBrain: loadedData.neuralNetwork,
                });
            } else {
                sim = new Simulation({
                    roadWidth: carCanvas.width,
                    inputs: {
                        carCount,
                        mutationRatio,
                        rayCount,
                        rayLength,
                        raySpread,
                        trafficMode,
                    },
                });
            }

            setSimulation(sim);

            if (carCtx && networkCtx) animate(10, carCtx, networkCtx, sim);
        }
        return () => {
            cancelAnimationFrame(animID as number);
        };
    }, [
        carCanvasRef.current,
        networkCanvasRef.current,
        rerunTrigger,
        trafficMode,
        mutationRatio,
        carCount,
        loadOptimalFlag,
    ]);

    // ====================================== ANIMATION
    function animate(
        time: number,
        carCtx: CanvasRenderingContext2D,
        networkCtx: CanvasRenderingContext2D,
        simulation: Simulation
    ) {
        if (!carCtx || !networkCtx) return;
        if (!simulation.activeCars) return;

        for (let tCar of simulation.traffic) {
            tCar.update(simulation.road.borders, []);
        }

        for (const car of simulation.cars) {
            if (!car.isDamaged)
                car.update(simulation.road.borders, simulation.traffic);
        }

        simulation.updateActiveCars();
        setActiveCars(simulation.activeCars);
        const bestCar = simulation.findBestCar();
        if (!bestCar) return;

        carCanvas.height = window.innerHeight * 0.92; //Putting this line here resets the canvas (clearing previous positions), and makes sure it ocupies the full screen height, even when it changes height
        networkCanvas.height = window.innerHeight * 0.92; //Putting this line here resets the canvas (clearing previous positions), and makes sure it ocupies the full screen height, even when it changes height
        networkCanvas.width = window.innerWidth * 0.3;

        carCtx.save();
        carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

        simulation.road.draw(carCtx);
        for (let tCar of simulation.traffic) {
            tCar.draw(carCtx);
        }

        carCtx.globalAlpha = 0.2;
        for (const car of simulation.cars) {
            if (!car.isDamaged) car.draw(carCtx);
        }
        carCtx.globalAlpha = 1;
        bestCar.draw(carCtx, true);

        carCtx.restore();

        if (bestCar.brain && networkCtx) {
            networkCtx.lineDashOffset = -time / 50;
            Visualizer.drawNetwork(networkCtx, bestCar.brain);
        }

        animID = requestAnimationFrame((a) =>
            animate(a, carCtx, networkCtx, simulation)
        );

        // console.log("Animation Running");
    }

    return (
        <>
            <Stack gap={3} direction="horizontal" className="simulation-pane">
                {/* Config Panel */}

                {/* IMPROVE: create separate component for the config form, and maybe pass a reducer? instead of states? */}
                <Container>
                    <Form>
                        <Container
                            fluid
                            id="configPanel"
                            className="text-center "
                        >
                            <h3>Configuration Panel</h3>
                            <hr className="my-2" />
                            <div id="configInputs">
                                <h4>Simulation Control</h4>
                                <span className="d-flex justify-content-evenly mt-3">
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                Save current neural network to
                                                local storage. By saving you can
                                                rerun the simulation and use
                                                that data to train the cars
                                            </Tooltip>
                                        }
                                    >
                                        <Button onClick={save}>Save</Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                Discard current neural network
                                                data. Erases all progress made,
                                                but keeps the simulation running
                                                with current data.
                                            </Tooltip>
                                        }
                                    >
                                        <Button onClick={discard}>
                                            Discard
                                        </Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        overlay={
                                            <Tooltip>
                                                Reruns the simulation. If data
                                                was saved to local storage, it
                                                will be loaded and used to
                                                compute a new simulation run. If
                                                "Load Optimal Data" is checked,
                                                then that data will be used
                                                instead
                                            </Tooltip>
                                        }
                                    >
                                        <Button onClick={rerun}>Rerun</Button>
                                    </OverlayTrigger>
                                </span>
                                <hr />
                                <h4>Neural Network</h4>
                                <Form.Group
                                    className="mb-3 m-auto"
                                    controlId="mutationRatio"
                                >
                                    <Row className="">
                                        <Col className="d-flex justify-content-end align-items-center">
                                            <Form.Label className="h5 mt-2">
                                                Mutation Ratio
                                            </Form.Label>
                                        </Col>
                                        <Col className="d-flex justify-content-center align-items-center">
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip>
                                                        {`
                                                        
                                                        Ratio between 0 and 1,
                                                        that defines how much
                                                        the neural network may
                                                        change regarding the
                                                        last "best car".
                                                        \n
                                                        0 -> No change
                                                        1-> Random
                                                        `}
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Control
                                                    type="number"
                                                    className="w-75"
                                                    value={mutationRatio}
                                                    onChange={(e) =>
                                                        setMutationRatio(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                    min="0"
                                                    max="1"
                                                    step="0.05"
                                                />
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </Form.Group>{" "}
                                <Form.Group
                                    className="mb-3 m-auto"
                                    controlId="loadOptimalData"
                                >
                                    <Row className="">
                                        <Col className="d-flex justify-content-center align-items-center">
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip>
                                                        {`
                                                        
                                                        Load pre trained data where a car can safely pass all the traffic cars
                                                        `}
                                                    </Tooltip>
                                                }
                                            >
                                                <ButtonGroup>
                                                    <ToggleButton
                                                        id="toggle-check"
                                                        type="checkbox"
                                                        variant={
                                                            loadOptimalFlag
                                                                ? "primary"
                                                                : "outline-secondary"
                                                        }
                                                        checked={
                                                            loadOptimalFlag
                                                        }
                                                        value={
                                                            loadOptimalFlag
                                                                ? 1
                                                                : 0
                                                        }
                                                        onChange={(e) =>
                                                            setLoadOptimalFlag(
                                                                e.currentTarget
                                                                    .checked as unknown as boolean
                                                            )
                                                        }
                                                    >
                                                        Load Optimal Data
                                                    </ToggleButton>
                                                </ButtonGroup>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <hr />
                                <h4>Traffic</h4>
                                <Form.Group
                                    className="mb-3 m-auto"
                                    controlId="trafficMode"
                                >
                                    <Row className="">
                                        <Col className="d-flex justify-content-end align-items-center">
                                            <Form.Label className="h5 mt-2">
                                                Density
                                            </Form.Label>
                                        </Col>
                                        <Col className="d-flex justify-content-center align-items-center">
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip>
                                                        {`
                                                        Select traffic mode (a preset of traffic cars that act as obstacles)
                                                        `}
                                                    </Tooltip>
                                                }
                                            >
                                                <Form.Select
                                                    aria-label="trafficMode"
                                                    className="w-75"
                                                    value={trafficMode}
                                                    onChange={(v) =>
                                                        setTrafficMode(
                                                            v.target
                                                                .value as TRAFFIC_MODES
                                                        )
                                                    }
                                                >
                                                    <option
                                                        value={
                                                            TRAFFIC_MODES.LOW
                                                        }
                                                    >
                                                        Low
                                                    </option>
                                                    <option
                                                        value={
                                                            TRAFFIC_MODES.MEDIUM
                                                        }
                                                    >
                                                        Medium
                                                    </option>
                                                    <option
                                                        value={
                                                            TRAFFIC_MODES.HEAVY
                                                        }
                                                    >
                                                        Heavy
                                                    </option>
                                                </Form.Select>
                                            </OverlayTrigger>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <hr />
                                <h4>Car</h4>
                                <fieldset
                                    disabled={
                                        simulation?.isReadingStoredData
                                            ? false
                                            : false
                                    }
                                >
                                    <Form.Group
                                        className="mb-3 m-auto"
                                        controlId="carCount"
                                    >
                                        <Row className="">
                                            <Col className="d-flex justify-content-end align-items-center">
                                                <Form.Label className="h5 mt-2">
                                                    Count
                                                </Form.Label>
                                            </Col>
                                            <Col className="d-flex justify-content-center align-items-center">
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip>
                                                            {`Number of  "test
                                                            cars" on the
                                                            simulation`}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Form.Control
                                                        type="number"
                                                        className="w-75"
                                                        value={carCount}
                                                        onChange={(e) =>
                                                            setCarCount(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        min="1"
                                                        step="10"
                                                    />
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </fieldset>
                                <hr />
                                <h4>Sensors</h4>
                                <fieldset
                                    disabled={
                                        simulation?.isReadingStoredData
                                            ? true
                                            : false
                                    }
                                >
                                    <Form.Group
                                        className="mb-3 m-auto"
                                        controlId="rayCount"
                                    >
                                        <Row className="">
                                            <Col className="d-flex justify-content-end align-items-center">
                                                <Form.Label className="h5 mt-2">
                                                    Ray Count
                                                </Form.Label>
                                            </Col>
                                            <Col className="d-flex justify-content-center align-items-center">
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip>
                                                            {simulation?.isReadingStoredData
                                                                ? "You can only change ray count if you are not reading from stored data."
                                                                : `Number of rays that provide inputs for the sensors`}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Form.Control
                                                        type="number"
                                                        className="w-75"
                                                        value={rayCount}
                                                        onChange={(e) =>
                                                            setRayCount(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        min="0"
                                                        step="1"
                                                    />
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3 m-auto"
                                        controlId="rayLength"
                                    >
                                        <Row className="">
                                            <Col className="d-flex justify-content-end align-items-center">
                                                <Form.Label className="h5 mt-2">
                                                    Ray Length
                                                </Form.Label>
                                            </Col>{" "}
                                            <Col className="d-flex justify-content-center align-items-center">
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip>
                                                            {simulation?.isReadingStoredData
                                                                ? "You can only change ray length if you are not reading from stored data."
                                                                : `Length of the rays that provide inputs for the sensors`}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Form.Control
                                                        type="number"
                                                        className="w-75"
                                                        value={rayLength}
                                                        onChange={(e) =>
                                                            setRayLength(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        min="0"
                                                        step="10"
                                                    />
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Form.Group
                                        className="mb-3 m-auto"
                                        controlId="raySpread"
                                    >
                                        <Row className="">
                                            <Col className="d-flex justify-content-end align-items-center ">
                                                <Form.Label className="h5 mt-2">
                                                    Ray Spread
                                                </Form.Label>
                                            </Col>{" "}
                                            <Col className="d-flex justify-content-center align-items-center">
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip>
                                                            {simulation?.isReadingStoredData
                                                                ? "You can only change ray spread if you are not reading from stored data."
                                                                : `Angular ratio between rays that provide inputs for the sensors`}
                                                        </Tooltip>
                                                    }
                                                >
                                                    <Form.Control
                                                        type="number"
                                                        className="w-75"
                                                        value={raySpread}
                                                        onChange={(e) =>
                                                            setRaySpread(
                                                                Number(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        min="0.25"
                                                        step="0.5"
                                                    />
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                </fieldset>
                            </div>
                            <hr className="my-2" />
                            <h4>Active Cars: {activeCars}</h4>
                        </Container>
                    </Form>
                </Container>
                {/* Road */}
                <Container className="d-flex justify-content-center">
                    <canvas ref={carCanvasRef} id="carCanvas"></canvas>
                </Container>
                {/* NeuralNetwork */}

                <Container className="d-flex justify-content-center">
                    <canvas ref={networkCanvasRef} id="networkCanvas"></canvas>
                </Container>
            </Stack>
            <Container id="unsupported-device">
                <h2 className="text-center ">
                    Sorry, your device seems to be unsupported
                </h2>
                <Button onClick={onClose}>Go back</Button>
            </Container>
        </>
    );
}
