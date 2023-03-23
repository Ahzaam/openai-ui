import firebase from "firebase/compat/app";
import { auth } from "../service/firebase";
import { signOut } from "firebase/auth";

const provider = new firebase.auth.GoogleAuthProvider();

const signInWithPopUp = () => {
  auth.signInWithPopup(provider);
};

const getUser = () => {
  return new Promise((resolve, reject) => {
    resolve(auth.currentUser);
  });
};

const handleLogout = () => {
  auth.signOut()
    .then(() => {
      console.log('User signed out successfully');
    })
    .catch((error) => {
      console.error(error);
    });
};
export { signInWithPopUp, getUser, handleLogout };
