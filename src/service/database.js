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
export async function getActivationData(uid) {
  return new Promise((resolve, reject) => {
    firestore
      .collection("users")
      .doc(uid)
      .collection("subscriptions")
      .where("status", "==", "active")
      .get()
      .then((response) => {
        resolve(response.docs.map((doc) => doc.data()));
      });
  });
}
export async function subscribeUserPaypal(uid, payments_details) {
  console.log(uid, payments_details);
  return firestore
    .collection("users")
    .doc(uid)
    .collection("subscriptions")
    .add(payments_details);
}
export async function getSubscribedUserPaypal(uid) {
  return new Promise((resolve, reject) => {
    return firestore
      .collection("users")
      .doc(uid)
      .collection("subscriptions")
      .where("status", "==", "ACTIVE")
      .get()
      .then((response) => {
        resolve(response.docs.map((doc) => doc.data()));
      });
  });
}
