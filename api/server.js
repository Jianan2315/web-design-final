const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3072;

// Define the API endpoint
app.get('/resume', (req, res) => {
    // Path to the saved resume JSON file
    const filePath = path.join(__dirname, '../json/resume_data.json');

    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).json({ error: 'Failed to fetch resume data' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

// Middleware to parse JSON requests
app.use(express.json());

// No block for test
const cors = require('cors');
app.use(cors());

// Endpoint to save JSON data
app.post('/save', (req, res) => {
    // Extract JSON data from the request body
    const resumeData = req.body;

    // Define the file path to save the JSON data
    const filePath = path.join(__dirname, '../json/resume_data.json');

    // Write JSON data to a file
    fs.writeFile(filePath, JSON.stringify(resumeData, null, 4), 'utf8', (err) => {
        if (err) {
            console.error("Error saving the file:", err);
            return res.status(500).json({ message: "Failed to save resume data." });
        }
        console.log("Resume data saved successfully.");
        res.status(200).json({ message: "Resume data saved successfully." });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
