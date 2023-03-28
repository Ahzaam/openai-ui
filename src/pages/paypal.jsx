/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { initialOptions, planDetails } from './Config/config';

const ButtonWrapper = ({ type }) => {
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
                    // Your code here after capture the order
                    console.log(details);
                });
            }}

            onCancel={
                () => {
                    console.log("Subscription Cancelled");

                }
            }

            onError={
                (ex) => {
                    console.log("Something Went Wrong!");
                    console.log(ex);
                }
            }

            style={{
                label: "subscribe",
                color: 'black'
            }}
        />);
}

export default function App() {
    return (
        <PayPalScriptProvider
            options={initialOptions}
        >
            <ButtonWrapper type="subscription" />
        </PayPalScriptProvider>
    );
}
