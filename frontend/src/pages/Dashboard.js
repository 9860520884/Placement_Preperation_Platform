import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Badge
} from '@mui/material';
import {
  Home,
  School,
  Code,
  Work,
  Description,
  ExitToApp,
  Person,
  Notifications
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Tabs
import HomeTab from './tabs/HomeTab';
import AptitudeTab from './tabs/AptitudeTab';
import CoursesTab from './tabs/CoursesTab';
import CodingTab from './tabs/CodingTab';
import InterviewsTab from './tabs/InterviewsTab';
import ResumeTab from './tabs/ResumeTab';
import ResumeATSTab from './tabs/ResumeATSTab';
import MentorshipCounselingTab from './tabs/MentorshipCounselingTab';
import Notification from './tabs/Notification';

import Footer from './Footer';
import AuthContext from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // State
  const [activeTab, setActiveTab] = useState('home');
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications] = useState(3);

  const username = user?.email?.split('@')[0] || 'User';
  const avatarURL = `https://ui-avatars.com/api/?name=${username}&background=random`;

  // Menu handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleNotificationClick = () => setActiveTab('notification');

  const handleStartNewCourseClick = () => {
    alert('Make sure to read all instructions carefully before starting the test. Once started, the timer cannot be paused.');
    window.open('https://www.coursera.org/', '_blank');
  };

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home /> },
    { id: 'aptitude', label: 'Take a Test', icon: <School /> },
    { id: 'courses', label: 'Courses', icon: <School /> },
    { id: 'coding', label: 'Coding Practice', icon: <Code /> },
    { id: 'interviews', label: 'Interview Prep', icon: <Work /> },
    { id: 'resume', label: 'Resume Builder', icon: <Description /> },
    { id: 'ats', label: 'ATS Checker', icon: <Description /> },
    { id: 'mentorship', label: 'Mentorship & Counseling', icon: <Person /> },
    { id: 'notification', label: 'Notifications', icon: <Notifications /> },
  ];

  // Tab content renderer
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home': return <HomeTab />;
      case 'aptitude': return <AptitudeTab />;
      case 'courses': return <CoursesTab />;
      case 'coding': return <CodingTab />;
      case 'interviews': return <InterviewsTab />;
      case 'resume': return <ResumeTab />;
      case 'ats': return <ResumeATSTab />;
      case 'mentorship': return <MentorshipCounselingTab />;
      case 'notification': return <Notification />;
      default: return <HomeTab />;
    }
  };

  return (
    <div className="dashboard-container">

      {/* Top Navigation Bar */}
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">

          {/* Logo */}
          <Typography variant="h6" className="logo">
            PrePrep
          </Typography>

          {/* Navigation Tabs */}
          <Box className="nav-items">
            {navItems.map((item) => (
              <Button
                key={item.id}
                startIcon={item.icon}
                className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Notification & Avatar */}
          <Box className="user-controls">
            <IconButton onClick={handleNotificationClick} color="inherit">
              <Badge badgeContent={notifications} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            <IconButton onClick={handleMenuOpen}>
              <Avatar src={avatarURL} />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => {
          handleMenuClose();
          navigate('/profile');
        }}>
          <Person /> Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Person /> My Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ExitToApp /> Logout
        </MenuItem>
      </Menu>

      {/* Main Content */}
      <main className="dashboard-content">
        <Container maxWidth="xl">
          <Paper className="content-card">
            {renderTabContent()}
          </Paper>

          {/* Call-to-action Button */}
          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleStartNewCourseClick}
            >
              Start Test
            </Button>
          </Box>
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
