import React, { useState, useEffect } from 'react';
import './MyAccountTab.css';
import { Container, Paper, Typography, Box, Divider, Avatar } from '@mui/material';

const MyAccountTab = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    joined: '',
    plan: '',
    avatar: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Container maxWidth="sm" className="my-account-container">
      <Paper elevation={3} className="my-account-paper">
        <Typography variant="h5" gutterBottom>
          My Account
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            src={user.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="h6" mt={2}>{user.name || 'Your Name'}</Typography>
          <Typography color="textSecondary">{user.email || 'Your Email'}</Typography>
        </Box>

        <Divider />

        <Box mt={3}>
          <Typography variant="body1"><strong>Membership Plan:</strong> {user.plan || 'Free'}</Typography>
          <Typography variant="body1"><strong>Joined:</strong> {user.joined || 'Not Available'}</Typography>
        </Box>

        <Box mt={4}>
          <Typography variant="body2" color="textSecondary">
            This is a view-only account summary. To update your profile, go to the Profile section.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default MyAccountTab;
