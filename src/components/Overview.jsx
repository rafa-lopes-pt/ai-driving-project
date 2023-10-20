import React from "react";
import { Accordion, Button, CloseButton, Container } from "react-bootstrap";

export default function Overview({ onClose }) {
    return (
        <Container id="overview">
            <header className="d-flex align-items-center justify-content-center overview__header">
                <h1 className="text-center m-auto">Project Overview</h1>
                <CloseButton
                    className="me-2 closeBtn"
                    variant="white"
                    onClick={onClose}
                />
            </header>
            <hr></hr>
            <div className="overflow-container">
                {" "}
                <h2 className="h4 text-center">
                    From JavaScript to TypeScript: Enhancing Reliability and
                    Code Structure
                </h2>
                <p className="text-center mt-3 pe-5 ps-5  ">
                    The TypeScript AI Car Simulation project represents a
                    foundational exploration into the realm of artificial
                    intelligence applied to autonomous vehicles. Originally
                    developed in JavaScript, this project has undergone a
                    significant transformation to improve its reliability and
                    developer-friendliness by transitioning to TypeScript.
                </p>
                <br />
                <br />
                <h3 className="h5">Project Objectives:</h3>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            Basic Autonomous Navigation
                        </Accordion.Header>
                        <Accordion.Body>
                            At its core, the project aims to create a simple AI
                            system capable of basic autonomous navigation. This
                            includes equipping cars with sensors to detect
                            obstacles, other vehicles, and road boundaries while
                            making rudimentary decisions based on sensory input.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            Neural Network Introduction
                        </Accordion.Header>
                        <Accordion.Body>
                            Although the neural network used in this project is
                            relatively basic, it introduces the concept of using
                            neural networks for AI decision-making. The network
                            evolves over iterations, albeit with limited
                            complexity.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            Simplified and Restructured Codebase
                        </Accordion.Header>
                        <Accordion.Body>
                            The transition from JavaScript to TypeScript was an
                            important step in the project, resulting in a
                            restructured and simplified codebase that
                            significantly improved the project's
                            maintainability, reliability, and
                            developer-friendliness.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <br />
                <h3 className="h5">Key Features:</h3>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            Simplified Environment:
                        </Accordion.Header>
                        <Accordion.Body>
                            The simulation environment, though basic, provides a
                            platform for testing fundamental AI car navigation
                            concepts. It includes a simplified road layout,
                            minimal traffic, and straightforward obstacles.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            Basic Neural Network
                        </Accordion.Header>
                        <Accordion.Body>
                            The project employs a rudimentary neural network
                            architecture with just two layers. While not
                            sophisticated, it serves as a starting point for
                            understanding neural network integration in
                            autonomous systems.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            Limited Learning and Adaptation
                        </Accordion.Header>
                        <Accordion.Body>
                            Through repeated iterations, the AI cars adapt to
                            basic scenarios. The learning process focuses on
                            making the cars navigate around obstacles and stay
                            within road boundaries.
                        </Accordion.Body>
                    </Accordion.Item>{" "}
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>
                            Basic Configurability
                        </Accordion.Header>
                        <Accordion.Body>
                            Users can modify sensor settings and traffic
                            conditions to observe how these changes impact the
                            AI car's performance, offering a basic level of
                            experimentation.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </Container>
    );
}
