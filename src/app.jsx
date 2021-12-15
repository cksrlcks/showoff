import React, { useEffect, useState } from "react";
import {
    Switch,
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import Feeds from "./components/feeds";
import MyPage from "./components/myPage";
import Write from "./components/write";
import Login from "./components/login";
const App = (props) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Feeds />} />
                <Route path="/write" element={<Write />} />
                <Route path="/my" element={<MyPage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
