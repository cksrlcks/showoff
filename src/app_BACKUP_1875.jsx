import React, { useEffect, useState } from "react";
import {
    Switch,
    BrowserRouter as Router,
    Route,
    Routes,
	useNavigate
} from "react-router-dom";
import Feeds from "./components/feeds";
import My from "./components/my";
import Navigation from "./components/navigation";
import Write from "./components/write";
import Login from './components/login';
const App = (props) => {
    return (
<<<<<<< HEAD
        <Router>
=======
        <Router>            
>>>>>>> 0eafea39bc418928ac298a47252ef0c977c4b181
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
