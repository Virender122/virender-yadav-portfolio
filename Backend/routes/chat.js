const express = require("express");
const router = express.Router();

const askAI = require("../services/ai");

router.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        // Streaming headers
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        await askAI(message, (chunk) => {
            console.log("SENDING CHUNK:", chunk);

            res.write(chunk);
        });

        res.end();

    } catch (error) {
        console.error("Error in /chat route:", error);

        if (!res.headersSent) {
            res.status(500).json({
                message: "Something went wrong"
            });
        } else {
            res.end();
        }
    }
});

module.exports = router;