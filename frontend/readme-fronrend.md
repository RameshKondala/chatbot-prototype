# Frontend - IoT Device Config Security Analyzer

## Overview
This frontend is a simple web application built with HTML, CSS, and JavaScript to provide a user interface for submitting IoT device configurations to the backend API for security analysis.

## Features
- Textarea input for pasting device configuration.
- Analyze button triggers AI security analysis request.
- Displays analysis result clearly below the form.

## How to Use
1. Open `index.html` in any modern web browser.
2. Paste the IoT device configuration into the input area.
3. Click the **Analyze** button.
4. View the AI-generated security risk analysis below.

## Notes
- The frontend sends requests to the backend at `http://localhost:3000/analyze-config` by default.
- Use VS Code Live Server or any HTTP server to avoid CORS or fetch restrictions when testing locally.
- Designed to be a lightweight interface focused on core functionality.

## Future Enhancements
- Add file upload support.
- Implement authentication and persistent sessions.
- Responsive design improvements and accessibility features.
