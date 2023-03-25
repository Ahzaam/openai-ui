const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.cancelSubscription = (sub_id) => {
  return new Promise((resolve, reject) => {
    console.log(sub_id);
    resolve(
      stripe.subscriptions.update(sub_id, { cancel_at_period_end: true })
    );
  });
  //
};
