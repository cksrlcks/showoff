import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./assets/scss/style.scss";
import "remixicon/fonts/remixicon.css";
import "react-medium-image-zoom/dist/styles.css";


import { firebaseApp } from "./services/firebase";
import AuthService from "./services/auth_service";
import PostRepository from "./services/feed_repository";
import Fcm from "./services/firebase_message";
import ImageUploader from "./services/image_uploader";

const authService = new AuthService();
const postRepository = new PostRepository(firebaseApp);
const imageUploader = new ImageUploader();
const pushMessageSerivce = new Fcm();

pushMessageSerivce.getToken();

ReactDOM.render(
    <App
        authService={authService}
        postRepository={postRepository}
        imageUploader={imageUploader}
        pushMessageSerivce={pushMessageSerivce}
    />,
    document.getElementById("app")
);
