import ProtectedRoute from './ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage/AccountSettingsPage';
import Notification from './pages/tabs/Notification';
import EnrollmentForm from './pages/tabs/EnrollmentForm';



const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />

                </ProtectedRoute>
              }
            />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/account" element={<AccountSettingsPage />} />
            <Route path="/enroll" element={<EnrollmentForm />} />
            <Route path="/notification" element={<Notification />} />

          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );

}

export default App;