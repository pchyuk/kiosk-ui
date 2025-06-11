// src/screens/ProcessingScreen.jsx

import React from 'react';
import { Typography, CircularProgress, Box } from '@mui/material';

// onConfirm 함수를 props로 받습니다.
const ProcessingScreen = ({ paymentMethod, onConfirm }) => (
  // Box에 onClick 이벤트를 추가하고, 클릭 커서가 보이도록 sx를 수정합니다.
  <Box 
    textAlign="center" 
    p={5} 
    onClick={onConfirm} 
    sx={{ cursor: 'pointer' }}
  >
    <CircularProgress />
    <Typography variant="h6" mt={3}>
      {paymentMethod === 'card' ? '카드 결제를 진행중입니다...' : '현금을 투입해주세요.'}
    </Typography>
    {/* 사용자에게 다음 행동을 안내하는 문구를 추가합니다. */}
    <Typography color="text.secondary" sx={{ mt: 2 }}>
      완료 후 화면을 터치하면 다음으로 진행됩니다.
    </Typography>
  </Box>
);

export default ProcessingScreen;