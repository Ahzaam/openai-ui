const caption = require("./controller/generateCaption");
const genEbook = require("./controller/genEbook");
const functions = require("firebase-functions");
const subscription = require("./controller/cancelSubscription");
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
require("dotenv").config();
exports.caption = functions.https.onCall((data, context) => {

  return caption.generateCaption(data.keyword, data.quote);
});

exports.ebookOutline = functions.https.onCall((data, context) => {
  // console.log(data);
  return genEbook.generateEbookOutline(data.keyword);
});

exports.ebookChapter = functions.https.onCall((data, context) => {
  // console.log(data);
  return genEbook.generateEbookChapter(data.keyword);
});

exports.cancelSubscription = functions.https.onCall((data, context) => {
  return subscription.cancelSubscription(data.sub_id);
});


exports.testFunc = functions.https.onRequest(async (req, res) => {
  // let data = await caption.generateCaption("Travel", true);
  res.json({ data: { id: 'w672513', name: 'sajid' } })
})