

var {Configuration} = require('openai');
var {OpenAIApi} = require('openai');
require('dotenv').config()



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const GenerateCaption =  async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const keywords = req.body.keywords || '';
  const quote = req.body.quote || false;
  const emoji = req.body.emoji || false;

  if (keywords.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid keywords",
      }
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
      messages: [{ role: "user", content: generatePrompt(keywords, quote, emoji) }],
    });
    console.log(completion.data.choices[0].message);


    res.status(200).json({ result: completion.data.choices[0].message });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(keywords, quote, emoji) {

  let prompt = "write a social media caption from these key words : ";
  let keywordArr = keywords.split(',');
  keywordArr.forEach(el => {
    prompt += ` ${el},`;
  })
  prompt += ' .';
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

module.exports = {GenerateCaption};