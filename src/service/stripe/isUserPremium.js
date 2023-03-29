// import firebase from "firebase/compat/app";
import { getSubscribedUserPaypal } from "../database";
import { api_auth } from "../../Config/config";

export default async function isUserPremium(user) {
  let res = await getSubscribedUserPaypal(user.uid);

  try {
    let sub_id = res[0]?.id;

    if (sub_id) {
      const response = await fetch(
        `https://api.sandbox.paypal.com/v1/billing/subscriptions/${sub_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: api_auth.auth,
          },
        }
      );
      const data = await response.json();
      let eligibe = false;

      let now = new Date();
      let nextPay = new Date(data?.billing_info?.last_payment.time);
      nextPay.setDate(nextPay.getDate() + 30);

      eligibe = now < nextPay;

      return data.name === "INVALID_REQUEST" ? null : { ...data, eligibe };
    }

    return null;
  } catch {
    return null;
  }
}
