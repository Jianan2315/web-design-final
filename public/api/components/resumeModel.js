const mongoose = require('mongoose');
const resumeSchema = new mongoose.Schema({
    email: { type: String, required: true },
    json: { type: String, required: true },
    templateId: { type: String, required: true },
    thumbnail: { type: String, required: true }
});
module.exports = mongoose.model('Resume', resumeSchema);