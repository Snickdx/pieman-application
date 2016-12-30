importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyCeKNfcnlIkYrdr2a0qA1QC0nZYdhoyOng",
  authDomain: "pieman-d47da.firebaseapp.com",
  databaseURL: "https://pieman-d47da.firebaseio.com",
  storageBucket: "pieman-d47da.appspot.com",
  messagingSenderId: "371107496995"
};

firebase.initializeApp(config);

firebase.messaging();
