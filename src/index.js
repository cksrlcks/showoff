import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./assets/scss/style.scss";
import "remixicon/fonts/remixicon.css";
import "react-medium-image-zoom/dist/styles.css";


import { firebaseApp } from "./services/firebase";
import AuthService from "./services/auth_service";
import PostRepository from "./services/feed_repository";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import ImageUploader from "./services/image_uploader";

const authService = new AuthService();
const postRepository = new PostRepository(firebaseApp);
const imageUploader = new ImageUploader();

const messaging = getMessaging(firebaseApp);
getToken(messaging, { vapidKey: 'BPOzQd0oZhSdplk23qOOcBxKyxBmC5eB5R5bfeAadKDrf8BK21N9DEz0-N-IQAkYvnFWQmBe-qljx28ueswe5VU' }).then((currentToken) => {
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
        console.log(currentToken)
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});

onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // ...
});

ReactDOM.render(
    <App
        authService={authService}
        postRepository={postRepository}
        imageUploader={imageUploader}
    />,
    document.getElementById("app")
);
