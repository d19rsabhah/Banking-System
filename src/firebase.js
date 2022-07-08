import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAmnqVzS3w8qL-Iu5nRV6ErdrsbRxGqhyk",
  authDomain: "banking-app-51ad0.firebaseapp.com",
  projectId: "banking-app-51ad0",
  storageBucket: "banking-app-51ad0.appspot.com",
  messagingSenderId: "277559850870",
  appId: "1:277559850870:web:c430f0ab0970ba52d82c57",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
