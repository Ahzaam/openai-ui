import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id":
    "AR6IrZFZFKrlig1Dm3BQrsgm0nLz_6Iy7_7ROaWO_n0b__a_GW0eiz1OUUjmjK8ALqnk21pLEBn0-YQk",
  currency: "USD",
  intent: "capture",
  "data-client-token": "abc123xyz==",
};

export default function A() {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons />
    </PayPalScriptProvider>
  );
}
