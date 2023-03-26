const openai = require("./openaiconfig");

exports.generateCaption = async (keyword, quote = false) => {
  return new Promise(async (resolve, reject) => {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      max_tokens: 2048,
      messages: [{ role: "user", content: generatePrompt(keyword, quote) }],
    });

    resolve(completion.data.choices[0].message);
  });
};

function generatePrompt(keywords, quote) {
  let prompt = `write a social media caption from these key words : ${keywords}`;

  if (quote) {
    prompt += "which includes A quote.";
  }

  return prompt;
}
