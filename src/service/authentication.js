import firebase from "firebase/compat/app";
import { auth } from "../service/firebase";

const provider = new firebase.auth.GoogleAuthProvider();

const signInWithPopUp = () => {
  auth.signInWithPopup(provider);
};

const getUser = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      resolve(user);
    });
  });
};
export { signInWithPopUp, getUser };
