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
      
      {/* ===== 1. 2x2 레이아웃으로 수정 ===== */}
      {/* Grid item에 xs={6}을 주어 한 줄에 2개씩 아이템을 배치합니다. */}
      <Grid container spacing={2} my={2} justifyContent="center">
        {amounts.map(amount => (
          <Grid item xs={6} key={amount}> 
            {/* ===== 2. 금액 선택 로직 변경 ===== */}
            {/* onConfirm 대신 setCustomAmount를 호출하여 아래 입력창의 값을 변경합니다. */}
            <Button 
              variant="outlined" 
              fullWidth 
              sx={{ py: 1.5 }} 
              onClick={() => setCustomAmount(amount)}
            >
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
          label="선택한 금액" // 라벨 텍스트를 좀 더 명확하게 변경
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value === '' ? '' : Number(e.target.value))}
          fullWidth
          placeholder="금액을 선택하세요"
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

      {/* 이 버튼을 눌러야만 최종적으로 다음 화면으로 넘어갑니다. */}
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