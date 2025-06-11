// src/screens/EnterAmountScreen.jsx

import React, { useState } from 'react';
import { Typography, Button, Grid, TextField, Box, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const EnterAmountScreen = ({ onConfirm }) => {
  const [customAmount, setCustomAmount] = useState('');
  const amounts = [50000, 100000, 200000, 300000];
  
  const increaseAmount = () => {
    setCustomAmount(prev => (Number(prev) || 0) + 10000);
  };

  const decreaseAmount = () => {
    setCustomAmount(prev => Math.max(0, (Number(prev) || 0) - 10000));
  };

  return (
    <Box textAlign="center">
      <Typography variant="h5" gutterBottom>전달하실 축의금을 선택해주세요</Typography>
      
      {/* ===== 바로 이 부분에 justifyContent="center"가 추가되었습니다! ===== */}
      <Grid container spacing={2} my={2} justifyContent="center">
        {amounts.map(amount => (
          <Grid item xs key={amount}> 
            <Button variant="outlined" fullWidth sx={{ py: 1.5 }} onClick={() => onConfirm(amount)}>
              {amount.toLocaleString()}원
            </Button>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" alignItems="center" my={2}>
        <IconButton onClick={decreaseAmount} color="primary" aria-label="금액 감소">
          <RemoveCircleOutlineIcon fontSize="large" />
        </IconButton>

        <TextField
          label="기타 금액"
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value === '' ? '' : Number(e.target.value))}
          fullWidth
          placeholder="이곳을 눌러 직접 입력"
          sx={{
            mx: 0.5,
            '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
              display: 'none',
            },
            '& input[type=number]': {
              MozAppearance: 'textfield',
              textAlign: 'center',
              fontSize: '1.2rem',
            },
          }}
        />

        <IconButton onClick={increaseAmount} color="primary" aria-label="금액 증가">
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </Box>

      <Button 
        variant="contained" 
        size="large" 
        onClick={() => onConfirm(Number(customAmount))} 
        disabled={!customAmount || Number(customAmount) <= 0}
      >
        금액 확정하기
      </Button>
    </Box>
  );
};

export default EnterAmountScreen;