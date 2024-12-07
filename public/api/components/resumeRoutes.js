const express = require('express');
const router = express.Router();
const resumeController = require('./resumeController');

// Route to create a job
router.post('/create/resume', resumeController.createResume);

// Route to get all jobs
router.post('/get/resumes', resumeController.getResumes);

module.exports = router;