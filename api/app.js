const express = require('express');
const mongoose = require('mongoose');
const resumeRoutes = require('./components/resumeRoutes');
const cors = require('cors');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(cors({}));

// Middleware
// app.use(express.json());
// Increase JSON body size limit
app.use(express.json({ limit: '10mb' })); // Set the limit to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true })); // For URL-encoded data
app.use('/', resumeRoutes);

// Old APIs
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

// MongoDB connection
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

module.exports=app;