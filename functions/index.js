const caption = require("./controller/generateCaption");
const functions = require("firebase-functions");
const subscription = require("./controller/cancelSubscription");
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
require("dotenv").config();
exports.caption = functions.https.onCall((data, context) => {
  return caption.generateCaption(data.keyword, data.quote);
});

exports.cancelSubscription = functions.https.onCall((data, context) => {
  return subscription.cancelSubscription(data.sub_id);
});
