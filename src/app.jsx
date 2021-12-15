import React, { useEffect, useState, useContext, createContext } from "react";
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

const App = ({ authService }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.onAuthChange((user) => {
            setUser(user);
        });
    }, [authService, user]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Feeds />} />
                <Route
                    path="/write"
                    element={<Write authService={authService} user={user} />}
                />
                <Route
                    path="/my"
                    element={<MyPage authService={authService} user={user} />}
                />
                <Route
                    path="/login"
                    element={<Login authService={authService} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
