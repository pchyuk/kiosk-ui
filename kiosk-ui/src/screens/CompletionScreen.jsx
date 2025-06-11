// src/screens/CompletionScreen.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const CompletionScreen = ({ name }) => (
  <Box textAlign="center" p={5}>
    <CheckCircleOutlineIcon sx={{ fontSize: 80, color: 'primary.main' }} />
    <Typography variant="h5" mt={3}>
      {name}님, 감사합니다.
    </Typography>
    <Typography color="text.secondary">
      영수증과 식권이 출력됩니다. 꼭 챙겨가세요.
    </Typography>
  </Box>
);
export default CompletionScreen;