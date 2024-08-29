import { Button, Container, Nav, Navbar } from "react-bootstrap";

export default function Header({ showHome, handleHomeNav }) {
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            className="bg-primary"
            id="header-nav"
        >
            <Container fluid>
                <Navbar.Brand
                    id="header-nav__brand"
                    href="https://www.youtube.com/watch?v=Rs_rAxEsAvI"
                    target="_blank"
                >
                    <i className="fa-brands fa-free-code-camp fa-xl me-2"></i>
                    AI Driving Simulation
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse
                    id="responsive-navbar-nav"
                    className="p-1 justify-content-end"
                >
                    <Nav className="me-2 ">
                        {showHome && (
                            <Nav.Link onClick={handleHomeNav}>
                                <i class="fa-solid fa-house me-2"></i>Home
                            </Nav.Link>
                        )}
                        <Nav.Link
                            href="https://www.youtube.com/watch?v=Rs_rAxEsAvI"
                            target="_blank"
                        >
                            <i class="fa-brands fa-youtube me-2"></i>
                            Original Project
                        </Nav.Link>
                        <Nav.Link
                            href="https://github.com/rafa-lopes-pt/ai-driving-project"
                            target="_blank"
                        >
                            <i class="fa-brands fa-github me-2"></i>
                            GitHub
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
