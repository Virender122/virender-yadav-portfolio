const axios = require("axios");
const resume = require("../data/resume");

const askAI = async (question, onChunk) => {
    try {

        const prompt = `
${resume}

VISITOR'S QUESTION:
${question}

Remember:
Answer ONLY according to Virender's portfolio information above.
Do not make up information.
Keep the answer concise, around 2-4 sentences.

ANSWER:
`;

        const response = await axios.post(
            "http://localhost:11434/api/generate",
            {
                model: "llama3.2:3b",
                prompt: prompt,
                stream: true,
                options: {
                    temperature: 0.2,
                    num_predict: 100
                }
            },
            {
                responseType: "stream"
            }
        );

        return new Promise((resolve, reject) => {

            let fullAnswer = "";

            response.data.on("data", (chunk) => {

                const lines = chunk
                    .toString()
                    .split("\n")
                    .filter(Boolean);

                for (const line of lines) {

                    try {

                        const data = JSON.parse(line);

                        if (data.response) {
                            fullAnswer += data.response;

                            // Send each piece to callback
                            if (onChunk) {
                                onChunk(data.response);
                            }
                        }

                        if (data.done) {
                            resolve(fullAnswer);
                        }

                    } catch (error) {
                        console.log("Stream parsing error:", error.message);
                    }
                }
            });

            response.data.on("error", reject);
        });

    } catch (error) {
        console.error("Ollama Error:", error.message);
        throw error;
    }
};

module.exports = askAI;