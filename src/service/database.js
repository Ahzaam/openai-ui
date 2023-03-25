import { firestore } from "./firebase";

export async function createUser(user) {
  return firestore.collection("users").doc(user.uid).set(user);
}

export async function updateUser(uid, user) {
  return firestore.collection("users").doc(uid).update(user);
}

export async function getUserData(uid) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(uid)
      .get()
      .then((response) => {
        resolve(response.data());
      });
  });
}

export async function getSubscriptionData(uid) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(uid)
      .collection("subscriptions")
      .where("canceled_at", "==", null)
      .get()
      .then((response) => {
        resolve({
          data: response.docs.map((doc) => doc.data()),
          id: response.docs.map((doc) => doc.id),
        });
      });
  });
}
