import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/functions";
const firebaseConfig = {
  apiKey: "AIzaSyAQBm4GHT6O7BNwxRqb3Q-vFOKMhMHdiyk",
  authDomain: "opanai-caption.firebaseapp.com",
  projectId: "opanai-caption",
  storageBucket: "opanai-caption.appspot.com",
  messagingSenderId: "404203186560",
  appId: "1:404203186560:web:4d05f5f135c344c92b3965",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const functions = firebase.functions();
firebase.functions().useEmulator("localhost", 5001);

export const auth = firebase.auth();
