# IoT Device Configuration Security Analyzer

## Overview
This project is an AI-powered tool that analyzes IoT device configurations for security risks using OpenAI's GPT model. Users paste device configurations, and the system returns detailed security assessments and suggestions for mitigation.

## Research Goals
The software prototype demonstrates how AI can automate security risk assessments for IoT devices, supporting scalable and accurate cybersecurity analysis aligned with current research in the field.

## Installation

### Backend
1. Open your terminal and navigate to the backend folder:

cd backend

2. Install dependencies:

npm install

3. Create a `.env` file in the `backend` folder with your OpenAI API key:

OPENAI_API_KEY=your_api_key_here

4. Start the backend server:
node app.js


### Frontend
- Open the file `frontend/index.html` in a web browser.
- Alternatively, use the VS Code Live Server extension to serve your frontend for best performance.

## Usage
- Paste your IoT device configuration text into the textarea.
- Click the "Analyze" button.
- View the AI-generated security risk analysis and mitigation advice displayed below.

## Project Structure
- `backend/` — Node.js Express server with OpenAI integration that performs security analysis.
- `frontend/` — HTML, CSS, and JavaScript files providing the user interface.

## Security Considerations
- API keys are securely stored in `.env` and not exposed publicly.
- Backend performs basic input validation and error handling.
- Recommendations and AI analysis are for informational purposes and should be verified by security professionals.

## Future Enhancements
- Support for uploading configuration files.
- User authentication and saved analysis report history.
- Improved user interface and mobile responsiveness.
- Extended research on prompt optimization and analysis accuracy.

## Contact and Support
For questions or contributions, please contact [Your Name] at [your.email@example.com].

