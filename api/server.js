const express = require('express');
const path = require('path');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3824;
const HOST = process.env.HOST || '127.0.0.116';

// Serve static files from the /public/dist directory
app.use(express.static(path.join(__dirname, 'public', 'dist')));

// Catch-all handler to serve index.html for React routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
