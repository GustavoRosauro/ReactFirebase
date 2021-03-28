import Firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCucrX9aFUrUjthlf0bpTHhS_sTwwSLNdI",
    authDomain: "codivdb.firebaseapp.com",
    databaseURL: "https://codivdb-default-rtdb.firebaseio.com",
    projectId: "codivdb",
    storageBucket: "codivdb.appspot.com",
    messagingSenderId: "1020587129809",
    appId: "1:1020587129809:web:20430bcb809d0e03917ef0",
    measurementId: "G-MEC7631L30"
  };
  const app = Firebase.initializeApp(firebaseConfig);
  export const db = app.database();