import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import './MentorshipCounselingTab.css';

const MentorshipCounselingTab = () => {
  return (
    <Box className="mentorship-section">
      <Typography variant="h3" className="mentorship-title">
        🌟 Mentorship & Counseling Support
      </Typography>
      <Typography className="mentorship-subtitle">
        Get expert career mentoring or speak to a certified counselor for mental well-being.
      </Typography>

      <Grid container spacing={4} className="mentorship-grid">

        {/* Mentorship Card */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} className="mentorship-card mentorship-glow">
            <Typography variant="h5" className="card-title">👨‍🏫 Career Mentorship</Typography>
            <Typography className="card-description">
              Our experienced mentors guide you through career paths, interview skills, and choosing the right tech stack.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="card-button"
              onClick={() => alert("✅ Mentor request submitted successfully!")}
            >
              Request a Mentor
            </Button>
          </Paper>
        </Grid>

        {/* Counseling Card */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} className="mentorship-card mentorship-glow counseling-card">
            <Typography variant="h5" className="card-title">💬 Student Counseling</Typography>
            <Typography className="card-description">
              Speak to professional counselors about exam stress, anxiety, motivation or time management challenges.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className="card-button"
              onClick={() => alert("✅ Counseling session booked successfully!")}
            >
              Book a Session
            </Button>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  );
};

export default MentorshipCounselingTab;
