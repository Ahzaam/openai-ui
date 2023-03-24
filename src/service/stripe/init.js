import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_51MoFvsSGgVWbVXGKL3xuUzKxmhChMLUTWPRY5mGqu9vymqXPb4VYYRiIqnFcAasCV3XZP1gas0FC0BLOjwexc9DV002elCyqnY"
    );
  }

  return stripePromise;
};

export default initializeStripe;
