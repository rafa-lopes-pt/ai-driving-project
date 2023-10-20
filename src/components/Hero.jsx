import { Button, Col, Container, Image, Row } from "react-bootstrap";

export default function Hero({ overviewHandler, simulationHandler }) {
    return (
        <Container fluid id="hero">
            <Container fluid className="mt-4 mb-4">
                <div className="text-center  mx-auto" id="tech-stack__row">
                    <div className="tech-stack__col">
                        <img
                            src="./media/react.png"
                            alt="React JS"
                            className="tech-stack__img"
                        />
                        <h3 className="tech-stack__title">React</h3>
                    </div>
                    <div className="tech-stack__col">
                        <img
                            src="./media/ts.png"
                            alt="Typescript"
                            className="tech-stack__img"
                        />
                        <h3 className="tech-stack__title">Typescript</h3>
                    </div>
                    <div className="tech-stack__col">
                        <img
                            src="./media/bootstrap.svg"
                            alt="Bootstrap"
                            className="tech-stack__img"
                        />
                        <h3 className="tech-stack__title">Bootstrap</h3>
                    </div>
                </div>
            </Container>
            <h1 className="text-center m-5">AI Driving Simulation</h1>
            <Container id="heroBtns" fluid>
                <Button variant="outline-info" onClick={overviewHandler}>
                    Overview
                </Button>
                <Button onClick={simulationHandler}>Simulation</Button>
            </Container>
        </Container>
    );
}
