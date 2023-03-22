import firebase from "firebase/compat/app";
import { auth } from "../service/firebase";
import { signOut } from "firebase/auth";

const provider = new firebase.auth.GoogleAuthProvider();

const signInWithPopUp = () => {
  auth.signInWithPopup(provider);
};

const getUser = () => {
  return new Promise((resolve, reject) => {
    resolve(auth.currentUser());
  });
};

const handleLogout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.

      console.log("Signed out successfully");
    })
    .catch((error) => {
      // An error happened.
    });
};
export { signInWithPopUp, getUser, handleLogout };
