import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./assets/scss/style.scss";
import "remixicon/fonts/remixicon.css";

import { firebaseApp } from "./services/firebase";
import AuthService from "./services/auth_service";

const authService = new AuthService();

ReactDOM.render(
    <App authService={authService} />,
    document.getElementById("app")
);
