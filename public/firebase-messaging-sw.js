importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const config = {
    apiKey: "AIzaSyB7IA7pfQidsxSDnKaR4IS67SiCMo8dzEU",
    authDomain: "showoff-ce053.firebaseapp.com",
    databaseURL: "https://showoff-ce053-default-rtdb.firebaseio.com",
    projectId: "showoff-ce053",
    storageBucket: "showoff-ce053.appspot.com",
    messagingSenderId: "785253429681",
    appId: "1:785253429681:web:fc8f416f3ec2264435cd90"
};
firebase.initializeApp(config)
const messaging = firebase.messaging();
messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
});

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});