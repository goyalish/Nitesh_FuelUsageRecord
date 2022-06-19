
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, child, get } from "firebase/database";

 // Initialize Firebase
 const firebaseConfig = {
    apiKey: "AIzaSyDZ-l_dhEP1O4FNJZ6s5tCLRrl8iTQAleE",
    authDomain: "info6127-1065565.firebaseapp.com",
    databaseURL: "https://info6127-1065565-default-rtdb.firebaseio.com",
    projectId: "info6127-1065565",
    storageBucket: "info6127-1065565.appspot.com",
    messagingSenderId: "180679416028",
    appId: "1:180679416028:web:2c2ff53544d83d47e47c19",
    measurementId: "G-CS2R8P19RZ"
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const auth = getAuth(app);
  export {app, database, auth};