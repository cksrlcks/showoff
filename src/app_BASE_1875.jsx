import React from "react";
import {
    Switch,
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import Feeds from "./components/feeds";
import Header from "./components/header";
import My from "./components/My";
import Navigation from "./components/navigation";
import Write from "./components/write";
const App = (props) => {
    return (
        <Router>
            <Header />
            <div className="m_container">
                <Routes>
                    <Route path="/" element={<Feeds />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/my" element={<My />} />
                </Routes>
            </div>
            <Navigation />
        </Router>
    );
};

export default App;
