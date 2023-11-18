// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpRCKsaDVg4koZzdXYs6AeUIwSkHpmHoY",
  authDomain: "the-next-leg-demo-91bc0.firebaseapp.com",
  projectId: "the-next-leg-demo-91bc0",
  storageBucket: "the-next-leg-demo-91bc0.appspot.com",
  messagingSenderId: "595970620475",
  appId: "1:595970620475:web:b67b23dc6b8d05ea8b701e",
  measurementId: "G-ET6S8PS016"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
export {firestore };
