require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const ANALYSIS_PROMPT = `
You are an expert in IoT security. Analyze the following device configuration.
- List security risks.
- Suggest mitigations.
- Explain clearly.
`;

app.post('/analyze-config', async (req, res) => {
  const { config } = req.body;
  if (!config) return res.status(400).json({ error: 'No configuration provided' });
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: ANALYSIS_PROMPT },
        { role: 'user', content: config }
      ]
    });
    res.json({ analysis: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'AI analysis failed' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
