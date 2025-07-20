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
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    remember: Yup.boolean()
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: false
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError('');

      try {
        const result = await login(values.email, values.password);
        if (result.success) {
          // Store remember me preference in localStorage
          if (values.remember) {
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('rememberMe');
          }
          navigate('/dashboard');
        } else {
          setError(result.message || 'Login failed');
        }
      } catch (err) {
        setError('An error occurred during login');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{
        p: 4,
        mt: 8,
        borderRadius: 2,
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Typography variant="h4" component="h1" sx={{
            fontWeight: 600,
            color: 'primary.main'
          }}>
            Welcome Back
          </Typography>
        </Box>

        {error && (
          <Typography
            color="error"
            align="center"
            sx={{
              mb: 2,
              p: 1,
              backgroundColor: 'error.light',
              borderRadius: 1
            }}
          >
            {error}
          </Typography>
        )}

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 1 }}
          />

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
            <FormControlLabel
              control={
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                  color="primary"
                />
              }
              label="Remember me"
            />

            <Link href="/forgot-password" underline="hover">
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 500
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Log In'
            )}
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link href="/register" underline="hover" sx={{ fontWeight: 500 }}>
              Sign up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;