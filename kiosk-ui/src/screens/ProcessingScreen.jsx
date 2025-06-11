// src/screens/ProcessingScreen.jsx
import React from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';

const ProcessingScreen = ({ paymentMethod }) => (
  <Box textAlign="center" p={5}>
    <CircularProgress />
    <Typography variant="h6" mt={3}>
      {paymentMethod === 'card' ? '카드 결제를 진행중입니다...' : '현금을 투입구에 넣어주세요.'}
    </Typography>
    <Typography color="text.secondary">잠시만 기다려주세요.</Typography>
  </Box>
);
export default ProcessingScreen;