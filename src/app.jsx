import React, { useEffect, useState } from "react";
import {
    Switch,
    BrowserRouter as Router,
    Route,
    Routes,
	useNavigate
} from "react-router-dom";
import Feeds from "./components/feeds";
import Header from "./components/header";
import My from "./components/My";
import Navigation from "./components/navigation";
import Write from "./components/write";
import Login from './components/login';
const App = (props) => {
    return (
        <Router>            
            <div className="m_container">
                <Routes>
                    <Route path="/" element={<Feeds />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/my" element={<My />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
