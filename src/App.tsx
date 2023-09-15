import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Overview from "./components/Overview";

import { AnimatePresence, motion } from "framer-motion";
import { Container } from "react-bootstrap";
import SimulationPane from "./components/SimulationPane";
enum screenID {
    HERO,
    OVERVIEW,
    SIMULATION,
}
function App() {
    //=========== SCREEN HANDLERS START

    const handleShowOverview = () => {
        setScreenKey(screenID.OVERVIEW);
    };
    const handleShowSimulation = () => {
        setScreenKey(screenID.SIMULATION);
    };
    const handleShowHome = () => {
        setScreenKey(screenID.HERO);
    };

    const screens = {
        [screenID.HERO]: (
            <Hero
                overviewHandler={handleShowOverview}
                simulationHandler={handleShowSimulation}
            ></Hero>
        ),
        [screenID.OVERVIEW]: <Overview onClose={handleShowHome}></Overview>,
        [screenID.SIMULATION]: (
            <SimulationPane onClose={handleShowHome}></SimulationPane>
        ),
    };

    const [screenKey, setScreenKey] = useState(screenID.HERO);
    //=========== SCREEN HANDLERS END

    return (
        <>
            <Header
                handleHomeNav={handleShowHome}
                showHome={screenKey !== screenID.HERO ? true : false}
            ></Header>
            <Container
                fluid
                className="d-flex flex-column justify-content-center align-items-center"
                id="content"
            >
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={`key+${screenKey}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.5,
                        }}
                        exit={{ opacity: 0 }}
                    >
                        {screens[screenKey]}
                    </motion.div>
                </AnimatePresence>
            </Container>
        </>
    );
}

export default App;
