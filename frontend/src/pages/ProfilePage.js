import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    avatar: '' // Default blank avatar
  });

  // Load from location or localStorage on mount
  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
      setIsNewUser(location.state.newUser || false);
      localStorage.setItem('userProfile', JSON.stringify(location.state.user));
    } else {
      const storedUser = localStorage.getItem('userProfile');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [location.state]);

  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('userProfile', JSON.stringify(user));
    if (isNewUser) {
      setIsNewUser(false);
      navigate('/dashboard');
    }
  };

  const handleCancel = () => {
    const storedUser = localStorage.getItem('userProfile');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore last saved version
    }
    setIsEditing(false);
    if (isNewUser) {
      navigate(-1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        {isNewUser && (
          <Typography variant="h5" color="primary" gutterBottom>
            Complete Your Profile
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Avatar Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={user.avatar || ''}
                sx={{ width: 150, height: 150, mb: 2 }}
              />
              {isEditing && (
                <>
                  <input
                    accept="image/*"
                    id="avatar-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="avatar-upload">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                      sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        bgcolor: 'background.paper'
                      }}
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </>
              )}
            </Box>

            {!isEditing && !isNewUser && (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit Profile
              </Button>
            )}
          </Box>

          {/* Profile Info Section */}
          <Box sx={{ flexGrow: 1 }}>
            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  margin="normal"
                  type="email"
                />
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  value={user.bio}
                  onChange={handleChange}
                  margin="normal"
                  multiline
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Website"
                  name="website"
                  value={user.website}
                  onChange={handleChange}
                  margin="normal"
                  placeholder="https://"
                />
              </>
            ) : (
              <>
                <Typography variant="h4" gutterBottom>
                  {user.name || 'No name provided'}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {user.email || 'No email provided'}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>
                  About
                </Typography>
                <Typography paragraph>
                  {user.bio || 'No bio provided'}
                </Typography>
                <Typography variant="body1">
                  <strong>Location:</strong> {user.location || 'Not specified'}
                </Typography>
                {user.website && (
                  <Typography variant="body1">
                    <strong>Website:</strong>{' '}
                    <a href={user.website} target="_blank" rel="noopener noreferrer">
                      {user.website}
                    </a>
                  </Typography>
                )}
              </>
            )}

            {isEditing && (
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
