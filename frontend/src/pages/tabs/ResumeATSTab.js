// src/pages/tabs/ResumeATSTab.js
import React, { useState } from 'react';
import { Box, Typography, Button, LinearProgress, Input, Paper } from '@mui/material';

const ResumeATSTab = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setScore(null);
  };

  const checkATSScore = () => {
    if (!file) return alert("Please upload a resume file first.");

    setLoading(true);
    // Simulated ATS analysis logic
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 50) + 50; // score between 50–100
      setScore(randomScore);
      setLoading(false);
    }, 2000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Resume ATS Checker</Typography>

      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="subtitle1">Upload Your Resume (PDF)</Typography>
        <Input
          type="file"
          inputProps={{ accept: '.pdf' }}
          onChange={handleFileChange}
          fullWidth
          style={{ marginTop: '10px', marginBottom: '20px' }}
        />

        <Button variant="contained" color="primary" onClick={checkATSScore}>
          Check ATS Score
        </Button>

        {loading && (
          <Box mt={3}>
            <Typography>Analyzing...</Typography>
            <LinearProgress />
          </Box>
        )}

        {score && !loading && (
          <Box mt={3}>
            <Typography variant="h6">Your ATS Score: {score}%</Typography>
            <LinearProgress variant="determinate" value={score} />
            <Typography variant="body2" mt={2}>
              {score >= 75
                ? "Great! Your resume is highly ATS compatible."
                : "Consider improving your resume with more keywords and better formatting."}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ResumeATSTab;
