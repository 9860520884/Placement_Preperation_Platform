const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// Save resume URL
router.post('/', async (req, res) => {
  try {
    const { userId, resumeUrl } = req.body;
    const newResume = new Resume({ userId, resumeUrl });
    await newResume.save();
    res.status(201).json(newResume);
  } catch (err) {
    res.status(500).json({ error: "Failed to save resume" });
  }
});

// Fetch user's resumes
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const resumes = await Resume.find({ userId });
    res.status(200).json(resumes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch resumes" });
  }
});

module.exports = router;