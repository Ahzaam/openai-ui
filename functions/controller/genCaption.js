var { Configuration } = require("openai");
var { OpenAIApi } = require("openai");
const functions = require("firebase-functions");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || functions.config().openai.key,
});
const openai = new OpenAIApi(configuration);
exports.generateCaption = async (keyword) => {
  return new Promise(async (resolve, reject) => {
    if (!configuration.apiKey) {
      reject({
        error: {
          message:
            "OpenAI API key not configured, please follow instructions in README.md",
        },
      });
      return;
    }

    const keywords = keyword || "";
    const quote = false;
    const emoji = false;

    if (keywords.trim().length === 0) {
      reject({
        error: {
          message: "Please enter a valid keywords",
        },
      });
      return;
    }

    try {
      // const completion = await openai.createCompletion({
      //   model: "text-davinci-003",
      //   prompt: generatePrompt(keywords, quote),
      //   temperature: 1,
      //   max_tokens: 2048
      // });

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 2048,
        messages: [
          { role: "user", content: generatePrompt(keywords, quote, emoji) },
        ],
      });
      console.log(completion.data.choices[0].message);

      resolve({ result: completion.data.choices[0].message });
    } catch (error) {
      // Consider adjusting the error handling logic for your use case
      if (error.response) {
        console.error(error.response.status, error.response.data);
        reject(error.response.data);
      } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        reject({
          error: {
            message: "An error occurred during your request.",
          },
        });
      }
    }
  });
};

function generatePrompt(keywords, quote, emoji) {
  let prompt = "write a social media caption from these key words : ";
  let keywordArr = keywords.split(",");
  keywordArr.forEach((el) => {
    prompt += ` ${el},`;
  });
  prompt += " .";
  if (quote) {
    prompt += "which includes A quote.";
  }
  if (emoji) {
    prompt += "Include emoji in the caption.";
  }
  if (!emoji) {
    prompt += "Do not Include emoji in the caption.";
  }

  console.log(prompt);
  return prompt;
}
