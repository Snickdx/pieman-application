const config = {
  apiKey: "AIzaSyCeKNfcnlIkYrdr2a0qA1QC0nZYdhoyOng",
  authDomain: "pieman-d47da.firebaseapp.com",
  databaseURL: "https://pieman-d47da.firebaseio.com",
  storageBucket: "pieman-d47da.appspot.com",
  messagingSenderId: "371107496995"
};

firebase.initializeApp(config);

const db = firebase.database();

firebase.messaging();
