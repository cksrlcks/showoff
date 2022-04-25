// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyB7IA7pfQidsxSDnKaR4IS67SiCMo8dzEU",
    authDomain: "showoff-ce053.firebaseapp.com",
    databaseURL: "https://showoff-ce053-default-rtdb.firebaseio.com",
    projectId: "showoff-ce053",
    storageBucket: "showoff-ce053.appspot.com",
    messagingSenderId: "785253429681",
    appId: "1:785253429681:web:fc8f416f3ec2264435cd90"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = paylaod.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        //icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});