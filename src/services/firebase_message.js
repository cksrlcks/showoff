import { firebaseApp } from './firebase'
import { getMessaging, getToken, onMessage } from "firebase/messaging";


class Fcm {
    constructor() {
        this.messaging = getMessaging(firebaseApp);
    }

    getToken() {
        return getToken(this.messaging, { vapidKey: 'BPOzQd0oZhSdplk23qOOcBxKyxBmC5eB5R5bfeAadKDrf8BK21N9DEz0-N-IQAkYvnFWQmBe-qljx28ueswe5VU' }).then((currentToken) => {
            if (currentToken) {
                // Send the token to your server and update the UI if necessary
                // ...
                //console.log(currentToken)
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
                // ...
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
        });
    }

    onMessageListener() {
        return new Promise((resolve) => {
            onMessage(this.messaging, (payload) => {
                resolve(payload);
            });

        });
    }

}

export default Fcm;