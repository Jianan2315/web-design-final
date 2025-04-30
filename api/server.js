const express = require('express');
const path = require('path');
const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3824;
const HOST = process.env.HOST || '127.0.0.116';

// Start the server
app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
