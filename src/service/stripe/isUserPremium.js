import firebase from "firebase/compat/app";

export default async function isUserPremium() {
  await firebase.auth().currentUser.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser.getIdTokenResult();
  return decodedToken.claims.stripeRole ? true : false;
}
