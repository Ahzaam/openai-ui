// App.js
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AR6IrZFZFKrlig1Dm3BQrsgm0nLz_6Iy7_7ROaWO_n0b__a_GW0eiz1OUUjmjK8ALqnk21pLEBn0-YQk",
      }}
    >
      <PayPalButtons style={{ layout: "horizontal" }} />
    </PayPalScriptProvider>
  );
}
