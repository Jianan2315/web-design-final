const Resume = require('./resumeModel');
exports.createResume = async (req, res) => {
    try {
        const { email, thumbnail, json, templateId } = req.body;
        if (!email || !thumbnail || !json || !templateId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const resume = new Resume({ email, thumbnail, json, templateId });
        await resume.save();
        res.status(201).json({ message: 'Resume created in database successfully', resume });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getResumes = async (req, res) => {
    try {
        const { email } = req.body;
        const resumes = await Resume.find({email});
        res.status(200).json({ message: 'Jobs retrieved successfully', resumes });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};