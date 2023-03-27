const openai = require("./openaiconfig");

exports.generateBlogPost = async (keyword, user, len = 500) => {
    return new Promise(async (resolve, reject) => {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 2048,
            messages: [{ role: "user", content: generatePrompt(keyword, len) }],
            temperature: 0.8,
            user
        });
        
        resolve(completion.data.choices[0].message);
    });
};

function generatePrompt(keywords, len) {
    let prompt = `write a blog post for the title "${keywords}".and this post should include ${len} words `;
    return prompt;
}