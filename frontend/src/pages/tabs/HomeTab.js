import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import './HomeTab.css';

const HomeTab = () => {
  return (
    <Box className="home-tab">
      <Typography variant="h4" className="welcome-title">
        Welcome to PrePrep!
      </Typography>

      <Typography variant="body1" className="welcome-subtitle">
        Your personalized preparation dashboard
      </Typography>

      <Box className="stats-container">
        <Paper className="stat-card">
          <Typography variant="h6">Completed Courses</Typography>
          <Typography variant="h4" className="stat-value">5</Typography>
        </Paper>

        <Paper className="stat-card">
          <Typography variant="h6">Practice Tests</Typography>
          <Typography variant="h4" className="stat-value">12</Typography>
        </Paper>

        <Paper className="stat-card">
          <Typography variant="h6">Interview Prep</Typography>
          <Typography variant="h4" className="stat-value">3</Typography>
        </Paper>
      </Box>

      <Box className="quick-actions">
        <Button variant="contained" className="action-button">
          Start New Course
        </Button>
        <Button variant="outlined" className="action-button">
          Take Practice Test
        </Button>
      </Box>
    </Box>
  );
};

export default HomeTab;