import firebase from "firebase/compat/app";
import { getSubscribedUserPaypal } from "../database";

let res;
export default async function isUserPremium(user) {
  try {
    const response = await fetch(
      `https://api.sandbox.paypal.com/v1/billing/subscriptions/I-4ANL5LTUP06T`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer EKBB7uMyhbyvFb3Ai3Cyq1eBlOkpDbqr-p4XTeVrdlSzpyjQDIjOzMb4HrP0kH4f3y6eT0hr43QNPX55`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    res = await getSubscribedUserPaypal("123456789123456789");
    return res.length > 0 ? true : false;
  } catch {
    return false;
  }
}
