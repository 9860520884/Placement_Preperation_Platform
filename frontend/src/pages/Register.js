import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Link,
  Container,
  Paper,
  Box,
  CircularProgress,
  Avatar
} from '@mui/material';
import AuthContext from '../context/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError('');

      try {
        const result = await register(
          values.username,
          values.email,
          values.password
        );

        if (result.success) {
          // Redirect to profile setup with initial data
          navigate('/profile', {
            state: {
              newUser: true,
              user: {
                name: values.username,
                email: values.email,
                bio: '',
                location: '',
                website: '',
                avatar: `https://i.pravatar.cc/150?u=${values.email}`
              }
            }
          });
        } else {
          setError(result.message || 'Registration failed');
        }
      } catch (err) {
        setError('An error occurred during registration');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
            {formik.values.username.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
        <Typography variant="h4" align="center" gutterBottom>
          Create Your Account
        </Typography>

        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            margin="normal"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Register'}
          </Button>

          <Typography align="center">
            Already have an account?{' '}
            <Link href="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;