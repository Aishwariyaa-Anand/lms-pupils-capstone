const OpenAIApi = require("openai");

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getAIResponse(query) {
  console.log(query);
  try {
    const response = await openai.completions.create({
      model: "gpt-4o-mini",
      prompt: query,
      max_tokens: 150,
    });

    console.log("API Response:", response); // Log the entire response object

    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0
    ) {
      return response.data.choices[0].text;
    } else {
      console.error("No choices found in response.");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching response from OpenAI API:", error);
    return undefined;
  }
}

module.exports = { getAIResponse };
