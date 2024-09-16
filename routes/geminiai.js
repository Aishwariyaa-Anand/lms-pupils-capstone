const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//const prompt = "Write a story about a magic backpack.";

//const result = await model.generateContent(prompt);
//console.log(result.response.text());

async function getAIResponse(query) {
  try {
    //const result =  await model.generateContent(query);
    const summaryPrompt =
      query + " Summarize this in a shortened form. Without formatting.";
    const result = await model.generateContent(summaryPrompt);
    console.log("API Response:", result.response.text()); // Log the entire response object
    return result.response.text();
  } catch (error) {
    console.error("Error fetching response from Gemini API:", error);
    return undefined;
  }
}

module.exports = { getAIResponse };
