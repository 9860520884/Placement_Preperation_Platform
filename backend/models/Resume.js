const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  resumeUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);