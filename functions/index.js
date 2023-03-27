const caption = require("./controller/generateCaption");
const genEbook = require("./controller/genEbook");
const genBlog = require("./controller/genBlog");
const functions = require("firebase-functions");
const subscription = require("./controller/cancelSubscription");
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
require("dotenv").config();
exports.caption = functions.https.onCall((data, context) => {

  return caption.generateCaption(data.keyword, data.user, data.quote);
});

exports.ebookOutline = functions.https.onCall((data, context) => {
  // console.log(data);
  return genEbook.generateEbookOutline(data.keyword, data.user);
});

exports.ebookChapter = functions.https.onCall((data, context) => {
  // console.log(data);
  return genEbook.generateEbookChapter(data.keyword, data.user);
});

exports.blogPost = functions.https.onCall((data, context) => {
  // console.log(data);
  return genBlog.generateBlogPost(data.keyword, data.user, data.len);
});

exports.cancelSubscription = functions.https.onCall((data, context) => {
  return subscription.cancelSubscription(data.sub_id);
});
