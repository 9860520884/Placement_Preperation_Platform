import React from 'react';
import { Box, Typography, Button, Paper, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Work, ExpandMore, VideoLibrary, Article, Mic, Code } from '@mui/icons-material';
import './InterviewsTab.css';

const InterviewsTab = () => {
  const interviewTypes = [
    {
      type: 'Technical Interviews',
      resources: [
        {
          title: 'Data Structures Questions',
          icon: <Article />,
          count: 45,
          link: 'https://www.geeksforgeeks.org/data-structures/'
        },
        {
          title: 'System Design Videos',
          icon: <VideoLibrary />,
          count: 12,
          link: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX'
        },
        {
          title: 'Algorithm Challenges',
          icon: <Code />,
          count: 30,
          link: 'https://leetcode.com/problemset/all/'
        }
      ]
    },
    {
      type: 'HR Interviews',
      resources: [
        {
          title: 'Common HR Questions',
          icon: <Article />,
          count: 25,
          link: 'https://www.indeed.com/career-advice/interviewing/hr-interview-questions-and-answers'
        },
        {
          title: 'Behavioral Tips',
          icon: <VideoLibrary />,
          count: 8,
          link: 'https://www.youtube.com/watch?v=Km3YV3DvxnA'
        },
        {
          title: 'Mock Interview Recordings',
          icon: <Mic />,
          count: 15,
          link: 'https://www.youtube.com/results?search_query=mock+interview+recordings'
        }
      ]
    }
  ];

  const handleScheduleClick = () => {
    window.location.href = 'https://www.finalroundai.com/ai-mock-interview';
  };

  const handleViewClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Box className="interviews-tab">
      <Typography variant="h4" className="tab-header">
        <Work fontSize="large" sx={{ mr: 1 }} />
        Interview Preparation
      </Typography>

      <Typography variant="body1" className="tab-subheader">
        Resources to help you ace your technical and HR interviews
      </Typography>

      <Box className="interview-types">
        {interviewTypes.map((interview, index) => (
          <Accordion key={index} className="interview-accordion">
            <AccordionSummary
              expandIcon={<ExpandMore />}
              className="accordion-header"
            >
              <Typography variant="h6">{interview.type}</Typography>
            </AccordionSummary>
            <AccordionDetails className="accordion-content">
              <Box className="resources-list">
                {interview.resources.map((resource, resIndex) => (
                  <Paper key={resIndex} className="resource-card">
                    <Box className="resource-icon">
                      {resource.icon}
                    </Box>
                    <Box className="resource-info">
                      <Typography variant="subtitle1">{resource.title}</Typography>
                      <Typography variant="body2">{resource.count} resources</Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      className="view-button"
                      onClick={() => handleViewClick(resource.link)}
                    >
                      View
                    </Button>
                  </Paper>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box className="mock-interview-section">
        <Typography variant="h6" className="section-title">
          Schedule Mock Interview
        </Typography>
        <Paper className="mock-interview-card">
          <Typography variant="body1" className="mock-text">
            Practice with our AI-powered mock interview system and get detailed feedback
          </Typography>

          <Button
            variant="contained"
            className="schedule-button"
            onClick={handleScheduleClick}
          >
            Schedule Now
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default InterviewsTab;
