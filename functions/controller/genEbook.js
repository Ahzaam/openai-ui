const openai = require("./openaiconfig");

exports.generateEbookOutline = async (title, user) => {
    return new Promise(async (resolve, reject) => {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 2048,
            messages: [{ role: "user", content: generatePrompt(title) }],
            user,
            temperature: 0.8
        });

        resolve(completion.data.choices[0].message);
    });
};

function generatePrompt(title) {
    let prompt = `write an outline for ebook ${title}`;
    // console.log(prompt);
    return prompt;
}

exports.generateEbookChapter = async (title, user) => {
    return new Promise(async (resolve, reject) => {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 2048,
            messages: [{ role: "user", content: generateChapterPrompt(title) }],
            user,
            temperature: 0.8
        });

        resolve(completion.data.choices[0].message);
    });
};

function generateChapterPrompt(title) {
    let prompt = `write a chapter for the title "${title}"`;
    // console.log(prompt);
    return prompt;
}