import firebase from "firebase/compat/app";
import { auth } from "../service/firebase";
import { createUser, getUserData, updateUser } from "./database";
const provider = new firebase.auth.GoogleAuthProvider();
let user;
const signInWithPopUp = () => {
  auth.signInWithPopup(provider).then((response) => {
    console.log(response.user.uid);
    if (response.additionalUserInfo.isNewUser) {
      user = {
        uid: response.user.uid,
        name: response.user.displayName,
        email: response.user.email,
        phone_number: response.user.phoneNumber,
        profile: response.user.photoURL,
        created_at: response.user.metadata.creationTime,
        last_login: response.user.metadata.lastSignInTime,
      };

      createUser(user);
    } else {
      getUserData(response.user.uid).then((user_data) => {
        user = user_data;
      });
      updateUser(response.user.uid, {
        last_login: response.user.metadata.lastSignInTime,
      });
    }
  });
};

const getUser = () => {
  return new Promise((resolve, reject) => {
    resolve(auth.currentUser);
  });
};

const handleLogout = () => {
  auth
    .signOut()
    .then(() => {
      console.log("User signed out successfully");
    })
    .catch((error) => {
      console.error(error);
    });
};
export { signInWithPopUp, getUserData as getUser, handleLogout };
