import { firebaseApp } from './firebase'


class Fcm {
    constructor() {
        this.firebaseMessaging = firebaseApp.messaging();
    }

    requestPermission() {
        this.firebaseMessaging.requestPermission()
            .then(() => {
                return this.firebaseMessaging.getToken(); // 등록 토큰 받기
            })
            .then(function (token) {
                console.log(token); //토큰 출력
            })
            .catch(function (error) {
                console.log("FCM Error : ", error);
            });

    }

    onMessage() {
        this.firebaseMessaging.onMessage(function (payload) {
            console.log(payload.notification.title);
            console.log(payload.notification.body);
        })
    }
}

export default Fcm;