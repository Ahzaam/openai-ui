const caption = require("./controller/genCaption");
const functions = require("firebase-functions");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
// SHAJIDH MAADU BELOW ONCALL NDU CHANGE PANNU
exports.helloWorld = functions.https.onCall((data, context) => {
  return caption.generateCaption(data.keyword);
});
