require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resumes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api/resumes', resumeRoutes);

// Routes
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.listen(5001, () => { // Change to unused port
//   console.log("Server running on port 5001");
// });