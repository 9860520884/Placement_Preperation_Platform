import React from 'react';
import { Box, Typography, Button, Paper, Chip } from '@mui/material';
import { School, Star, People, Schedule } from '@mui/icons-material';
import './CoursesTab.css';
import { useNavigate } from 'react-router-dom';


const CoursesTab = () => {
  const navigate = useNavigate();
  const courses = [
    {
      title: 'Data Structures Masterclass',
      instructor: 'Dr. Jane Smith',
      rating: 4.8,
      students: 1245,
      duration: '8 weeks',
      category: 'Programming'
    },
    {
      title: 'Quantitative Aptitude Crash Course',
      instructor: 'Prof. John Doe',
      rating: 4.6,
      students: 876,
      duration: '6 weeks',
      category: 'Aptitude'
    },
    {
      title: 'Behavioral Interview Preparation',
      instructor: 'Career Coach Amy',
      rating: 4.9,
      students: 1532,
      duration: '4 weeks',
      category: 'Interview'
    }
  ];
  const handleEnroll = (courseTitle) => {
    navigate('/enroll');
  };

  return (
    <Box className="courses-tab">
      <Typography variant="h4" className="tab-header">
        <School fontSize="large" sx={{ mr: 1 }} />
        Available Courses
      </Typography>

      <Typography variant="body1" className="tab-subheader">
        Browse and enroll in courses to boost your preparation
      </Typography>

      <Box className="filter-section">
        <Button variant="outlined" className="filter-button active">
          All Courses
        </Button>
        <Button variant="outlined" className="filter-button">
          Programming
        </Button>
        <Button variant="outlined" className="filter-button">
          Aptitude
        </Button>
        <Button variant="outlined" className="filter-button">
          Interview Prep
        </Button>
      </Box>

      <Box className="courses-list">
        {courses.map((course, index) => (
          <Paper key={index} className="course-card">
            <Box className="course-header">
              <Typography variant="h6" className="course-title">
                {course.title}
              </Typography>
              <Chip label={course.category} className="course-category" />
            </Box>

            <Typography variant="body2" className="course-instructor">
              Instructor: {course.instructor}
            </Typography>

            <Box className="course-meta">
              <Box className="meta-item">
                <Star className="meta-icon" />
                <Typography variant="body2">{course.rating}/5</Typography>
              </Box>
              <Box className="meta-item">
                <People className="meta-icon" />
                <Typography variant="body2">{course.students} students</Typography>
              </Box>
              <Box className="meta-item">
                <Schedule className="meta-icon" />
                <Typography variant="body2">{course.duration}</Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              className="enroll-button"
              onClick={() => handleEnroll(course.title)}
            >
              Enroll Now
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default CoursesTab;