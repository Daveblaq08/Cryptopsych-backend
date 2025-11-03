// server.js
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import cors from "cors";

// Load environment variables
dotenv.config();
console.log("🔑 FIREWORKS_API_KEY:", process.env.FIREWORKS_API_KEY ? "Loaded ✅" : "❌ Missing");

const app = express();
app.use(express.json());
app.use(cors());

// Fireworks AI Chat Endpoint
app.post("/api/fireworks", async (req, res) => {
    try {
        const payload = {
            model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
            messages: [
                { role: "system", content: "You are a crypto psychology assistant named Dobby." },
                { role: "user", content: req.body.message }
            ]
        };

        console.log("📦 Payload:", payload);

        const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.FIREWORKS_API_KEY}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log("📡 Fireworks response:", data);
        res.json(data);
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Failed to reach Fireworks API" });
    }
});

// Start server
const PORT = 5050;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
