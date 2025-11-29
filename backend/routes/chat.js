const express = require('express');
const OpenAI = require('openai');
const Device = require('../models/device');
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  
  // Retrieve relevant device data
  const devices = await Device.find().sort({ riskScore: -1 });
  const context = devices.map(d => 
    `Device ${d.ip}: Risk ${d.riskScore}, Issues: ${d.issues.join(', ')}`
  ).join('\n');
  
  const prompt = `
    You are an IoT security expert. Analyze these device configs:
    ${context}
    
    User: ${message}
    
    Respond with risk analysis, explanations, and remediation steps.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }]
  });
  
  res.json({ response: completion.choices[0].message.content });
});

module.exports = router;
