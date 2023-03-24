import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_51MpFssDqNPaHATRxUjJgnmmAEdzyZbpDA7ufbG0E5ypLUO3mp09J36quCIGq1gzh1RlDkj6tkK5z7lFWR4XPfR2k00bzsjitgs"
    );
  }

  return stripePromise;
};

export default initializeStripe;
