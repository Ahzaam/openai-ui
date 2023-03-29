/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { initialOptions, planDetails } from "../Config/config";
import { subscribeUserPaypal } from "../service/database";


const ButtonWrapper = ({ type, user, updateUser }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [type]);

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            ...planDetails,
          })
          .then((orderId) => {
            // Your code here after create the order
            return orderId;
          });
      }}
      onApprove={function (data, actions) {
        return actions.subscription.get().then(function (details) {
          subscribeUserPaypal(user.uid, details);
          // Your code here after capture the order
          console.log(details);
          updateUser();
        });
      }}
      onCancel={() => {
        console.log("Subscription Cancelled");
      }}
      onError={(ex) => {
        console.log("Something Went Wrong!");
        console.log(ex);
      }}
      style={{
        label: "subscribe",
        color: "black",
      }}
    />
  );
};

export default function Paypal({user, updateUser}) {
  return (
    <PayPalScriptProvider options={initialOptions} deferLoading={true}>
      <ButtonWrapper type="subscription" user={user} updateUser={updateUser}/>
    </PayPalScriptProvider>
  );
}
