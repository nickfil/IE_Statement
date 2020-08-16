import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDN7BnRS5snO0NpeeHCd9NaBoqAz1wi52M",
    authDomain: "ie-statement.firebaseapp.com",
    databaseURL: "https://ie-statement.firebaseio.com",
    projectId: "ie-statement",
    storageBucket: "ie-statement.appspot.com",
    messagingSenderId: "739702138427",
    appId: "1:739702138427:web:7f1e3fedbb6bd738fa1e1e",
    measurementId: "G-XW09V004K7"
  };
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;