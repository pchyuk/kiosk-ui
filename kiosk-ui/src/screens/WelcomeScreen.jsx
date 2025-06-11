// src/screens/WelcomeScreen.jsx
import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';

const WelcomeScreen = ({ onStart }) => (
  <Box textAlign="center">
    <CelebrationIcon sx={{ fontSize: 80, color: 'secondary.main' }} />
    <Typography variant="h4" gutterBottom mt={2}>축하해주셔서 감사합니다</Typography>
    <Typography variant="h6" color="text.secondary">신랑 & 신부</Typography>
    <Button variant="contained" size="large" onClick={onStart} sx={{ mt: 4 }}>
      축의금 전달하기
    </Button>
  </Box>
);
export default WelcomeScreen;