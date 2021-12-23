import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./assets/scss/style.scss";
import "remixicon/fonts/remixicon.css";
import "react-medium-image-zoom/dist/styles.css";

import { firebaseApp } from "./services/firebase";
import AuthService from "./services/auth_service";
import PostRepository from "./services/feed_repository";
import ImageUploader from "./services/image_uploader";
const authService = new AuthService();
const postRepository = new PostRepository(firebaseApp);
const imageUploader = new ImageUploader();

ReactDOM.render(
    <App
        authService={authService}
        postRepository={postRepository}
        imageUploader={imageUploader}
    />,
    document.getElementById("app")
);
