const ProductDisplay = () => (
    <section>
      <div className="product">
        <div className="description">
          <h3>Starter plan</h3>
          <h5>$20.00 / month</h5>
        </div>
      </div>
      <form action="/create-checkout-session" method="POST">
        {/* Add a hidden field with the lookup_key of your Price */}
        <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
        <button id="checkout-and-portal-button" type="submit">
          Checkout
        </button>
      </form>
    </section>
  );
  
  const SuccessDisplay = ({ sessionId }) => {
    return (
      <section>
        <div className="product Box-root">
          <div className="description Box-root">
            <h3>Subscription to starter plan successful!</h3>
          </div>
        </div>
        <form action="/create-portal-session" method="POST">
          <input
            type="hidden"
            id="session-id"
            name="session_id"
            value={sessionId}
          />
          <button id="checkout-and-portal-button" type="submit">
            Manage your billing information
          </button>
        </form>
      </section>
    );
  };
  
  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );
  