import React from 'react';
import { Box, Typography, Link, Divider } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Divider className="footer-divider" />

      <Box className="footer-content">
        <Box className="footer-section">
          <Typography variant="h6" className="footer-heading">PrePrep</Typography>
          <Typography variant="body2">
            Your complete preparation platform for tech careers.
          </Typography>
        </Box>

        <Box className="footer-section">
          <Typography variant="subtitle1" className="footer-heading">Quick Links</Typography>
          <Link href="#" className="footer-link">Home</Link>
          <Link href="#" className="footer-link">Courses</Link>
          <Link href="#" className="footer-link">Practice</Link>
          <Link href="#" className="footer-link">Resources</Link>
        </Box>

        <Box className="footer-section">
          <Typography variant="subtitle1" className="footer-heading">Legal</Typography>
          <Link href="#" className="footer-link">Terms</Link>
          <Link href="#" className="footer-link">Privacy</Link>
          <Link href="#" className="footer-link">Cookies</Link>
        </Box>

        <Box className="footer-section">
          <Typography variant="subtitle1" className="footer-heading">Connect</Typography>
          <Box className="social-icons">
            <Link href="#"><Facebook className="social-icon" /></Link>
            <Link href="#"><Twitter className="social-icon" /></Link>
            <Link href="#"><LinkedIn className="social-icon" /></Link>
            <Link href="#"><Instagram className="social-icon" /></Link>
          </Box>
        </Box>
      </Box>

      <Box className="footer-bottom">
        <Typography variant="body2">
          © {new Date().getFullYear()} PrePrep. All rights reserved.
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;