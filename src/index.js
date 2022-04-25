import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./assets/scss/style.scss";
import "remixicon/fonts/remixicon.css";
import "react-medium-image-zoom/dist/styles.css";


import { firebaseApp } from "./services/firebase";
import AuthService from "./services/auth_service";
import PostRepository from "./services/feed_repository";
import { getMessaging, getToken } from "firebase/messaging";
import ImageUploader from "./services/image_uploader";

const authService = new AuthService();
const postRepository = new PostRepository(firebaseApp);
const imageUploader = new ImageUploader();

const messaging = getMessaging(firebaseApp);
getToken(messaging, { vapidKey: 'AAAAttTAcbE:APA91bHNEThwWq5_yZR52e7SrvsFGNtjgFp77jFteSyNk4BXxpaSO6i8H2AJmrYxDcm841x0B5MHz0aHCC6OLVmms27Y0tSgvW--14wj4QsAHQInG0K6dllk6XhrJ-AuvrtPfM09heqE' }).then((currentToken) => {
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

ReactDOM.render(
    <App
        authService={authService}
        postRepository={postRepository}
        imageUploader={imageUploader}
    />,
    document.getElementById("app")
);
