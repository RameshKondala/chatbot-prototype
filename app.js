require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require("openai");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API call failed:", error); // This will print the exact error in your terminal.
    res.status(500).send("Error processing request");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
