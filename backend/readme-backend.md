# Backend - IoT Device Config Security Analyzer

## Overview
This backend is built with Node.js and Express to provide an API that analyzes IoT device configurations for security risks by leveraging OpenAI's GPT model.

## Features
- Exposes a REST API endpoint `/analyze-config` accepting device configuration text.
- Calls OpenAI API with a custom prompt to detect security vulnerabilities in configurations.
- Returns detailed security risk analysis and mitigation suggestions.

## Setup Instructions

### Prerequisites
- Node.js v16 or higher installed
- OpenAI API key with proper quota

### Installation
1. Navigate to the backend folder:

cd backend

2. Install dependencies:
npm install

3. Create `.env` file:

OPENAI_API_KEY=your_openai_api_key_here

4. Run the server:
node app.js

5. The server will listen on port 3000 by default.

## API Usage
- POST `/analyze-config`
- Content-Type: application/json
- Body:

{“config”: “your device configuration text here”}


## Notes
- Environment variables are managed via `.env` and not committed.
- Input validation and error handling implemented.
- The backend is intended to be used alongside the frontend UI for best user experience.


