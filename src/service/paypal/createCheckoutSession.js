import { firestore } from "../firebase";
import getStripe from "./init";
export async function createCheckoutSessions(uid) {
  const checkoutRef = await firestore
    .collection("users")
    .doc(uid)
    .collection("checkout_sessions")
    .add({
      price: "price_1MpGd3DqNPaHATRxkWlpfg8J",
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

  checkoutRef.onSnapshot(async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}
