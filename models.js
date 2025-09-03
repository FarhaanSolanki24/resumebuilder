const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    summary: String,
    experience: String, 
    education: String,
    skills: [String], 
    projects: [String], 
    colorScheme: String,
    font: String,
    fontStyle: String,
    templateStyles: String,
    createdAt: { type: Date, default: Date.now },
});

const jobAlertSchema = new mongoose.Schema({
    keyword: String,
    location: String,
    email: String,
    createdAt: { type: Date, default: Date.now },
});

const Resume = mongoose.model('Resume', resumeSchema);

const JobAlert = mongoose.model('JobAlert', jobAlertSchema);

module.exports = { Resume, JobAlert }; 