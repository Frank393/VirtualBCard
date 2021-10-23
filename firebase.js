
import firebase from 'firebase'
//import { firebase } from 'firebase';
import 'firebase/firebase-firestore';

var firebaseConfig = {
  apiKey: "AIzaSyAVNeC1jsNgea4ihATMAod-zT08cliiKn8",
  authDomain: "capstone-2009f.firebaseapp.com",
  projectId: "capstone-2009f",
  storageBucket: "capstone-2009f.appspot.com",
  messagingSenderId: "129576240560",
  appId: "1:129576240560:web:e770015b5efdc5846f4275"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 //const firebase = initializeApp(firebaseConfig);
 var firestore = firebase.firestore();

 export default firestore;

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVNeC1jsNgea4ihATMAod-zT08cliiKn8",
  authDomain: "capstone-2009f.firebaseapp.com",
  projectId: "capstone-2009f",
  storageBucket: "capstone-2009f.appspot.com",
  messagingSenderId: "129576240560",
  appId: "1:129576240560:web:e770015b5efdc5846f4275"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


*/
