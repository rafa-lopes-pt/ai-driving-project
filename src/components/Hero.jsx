import { Button, Col, Container, Image, Row } from "react-bootstrap";

export default function Hero({ overviewHandler, simulationHandler }) {
    return (
        <Container fluid id="hero">
            <Container fluid className="mt-4 mb-4">
                <Row className="text-center  " id="tech-stack__row">
                    <Col className="tech-stack__col">
                        <Image
                            src="./media/react.png"
                            alt="React JS"
                            rounded
                            width={140}
                            className="tech-stack__img"
                        />
                        <h3 className="tech-stack__title">React</h3>
                    </Col>
                    <Col className="tech-stack__col">
                        <Image
                            src="./media/ts.png"
                            alt="Typescript"
                            rounded
                            width={120}
                            className="tech-stack__img"
                        />
                        <h3 className="tech-stack__title">Typescript</h3>
                    </Col>
                    <Col className="tech-stack__col">
                        <Image
                            src="./media/bootstrap.svg"
                            alt="Bootstrap"
                            rounded
                            width={150}
                            className="tech-stack__img"
                        />
                        <h3 className="tech-stack__title">Bootstrap</h3>
                    </Col>
                </Row>
            </Container>
            <h1 className="text-center m-5">AI Driving Simulation</h1>
            <Container id="heroBtns">
                <Button variant="outline-info" onClick={overviewHandler}>
                    Overview
                </Button>
                <Button onClick={simulationHandler}>Simulation</Button>
            </Container>
        </Container>
    );
}
