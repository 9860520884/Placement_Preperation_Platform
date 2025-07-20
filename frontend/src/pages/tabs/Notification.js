// src/pages/tabs/NotificationTab.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Paper
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import './Notification.css';

const Notification = () => {
  const notifications = [
    {
      title: 'New Aptitude Test Available!',
      subtitle: 'Practice questions are now live!',
      icon: <SchoolIcon />,
    },
    {
      title: 'New Coding Challenge',
      subtitle: 'Improve your logic with today’s question.',
      icon: <CodeIcon />,
    },
    {
      title: 'Resume Tip of the Day',
      subtitle: 'Optimize your resume to get more views.',
      icon: <WorkIcon />,
    },
    {
      title: 'Mock Interview Invite',
      subtitle: 'Join upcoming mock interviews.',
      icon: <NotificationsIcon />,
    },
  ];

  return (
    <Box className="notification-tab">
      <Typography variant="h4" gutterBottom>Notifications</Typography>
      <Paper elevation={3} className="notification-list">
        <List>
          {notifications.map((note, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar className="notif-icon">{note.icon}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={note.title} secondary={note.subtitle} />
              </ListItem>
              {index < notifications.length - 1 && <Divider variant="inset" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Notification;
