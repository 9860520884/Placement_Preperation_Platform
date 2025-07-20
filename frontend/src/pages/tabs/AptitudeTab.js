import React from 'react';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import { Quiz, Timer, EmojiEvents } from '@mui/icons-material';
import './AptitudeTab.css';

const AptitudeTab = () => {
  const categories = [
    'Quantitative Aptitude',
    'Logical Reasoning',
    'Verbal Ability',
    'Data Interpretation'
  ];

  const recentTests = [
    { name: 'Basic Arithmetic', score: '85%', date: '2 days ago' },
    { name: 'Logical Puzzles', score: '72%', date: '1 week ago' },
    { name: 'Vocabulary Test', score: '91%', date: '2 weeks ago' }
  ];

  const handleExternalLink = () => {
    window.open('https://www.indiabix.com/online-test/category/aptitude/', '_blank');
  };

  return (
    <Box className="aptitude-tab">
      <Typography variant="h4" className="tab-header">
        <Quiz fontSize="large" sx={{ mr: 1 }} />
        Aptitude Preparation
      </Typography>

      <Typography variant="body1" className="tab-subheader">
        Practice and improve your skills for placement tests
      </Typography>

      <Box className="category-section">
        <Typography variant="h6" className="section-title">
          Test Categories
        </Typography>
        <Box className="category-chips">
          {categories.map((category, index) => (
            <Chip
              key={index}
              label={category}
              className="category-chip"
              clickable
              variant="outlined"
              onClick={handleExternalLink}
            />
          ))}
        </Box>
      </Box>

      <Box className="test-section">
        <Typography variant="h6" className="section-title">
          Quick Practice
        </Typography>
        <Box className="test-cards">
          <Paper className="test-card">
            <Box className="test-card-header">
              <Timer className="test-icon" />
              <Typography variant="subtitle1">Timed Test</Typography>
            </Box>
            <Typography variant="body2" className="test-description">
              25 questions in 30 minutes
            </Typography>
            <Button variant="contained" className="start-button" onClick={handleExternalLink}>
              Start Now
            </Button>
          </Paper>

          <Paper className="test-card">
            <Box className="test-card-header">
              <EmojiEvents className="test-icon" />
              <Typography variant="subtitle1">Challenge Mode</Typography>
            </Box>
            <Typography variant="body2" className="test-description">
              Compete with other users
            </Typography>
            <Button variant="contained" className="start-button" onClick={handleExternalLink}>
              Join Challenge
            </Button>
          </Paper>
        </Box>
      </Box>

      <Box className="recent-section">
        <Typography variant="h6" className="section-title">
          Recent Tests
        </Typography>
        <Box className="recent-tests">
          {recentTests.map((test, index) => (
            <Paper key={index} className="recent-test">
              <Typography variant="subtitle1">{test.name}</Typography>
              <Box className="test-meta">
                <Typography variant="body2">Score: {test.score}</Typography>
                <Typography variant="body2">{test.date}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AptitudeTab;
