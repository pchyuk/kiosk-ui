// src/screens/EnterAmountScreen.jsx

import React, { useState } from 'react';
import { Typography, Button, Grid, TextField, Box, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const EnterAmountScreen = ({ onConfirm }) => {
  const [customAmount, setCustomAmount] = useState('');
  const amounts = [50000, 100000, 200000, 300000];

  const increaseAmount = () => {
    setCustomAmount((prev) => (Number(prev) || 0) + 10000);
  };

  const decreaseAmount = () => {
    setCustomAmount((prev) => Math.max(0, (Number(prev) || 0) - 10000));
  };

  return (
    <Box textAlign="center">
      {/* 화면 크기에 따라 제목의 글자 크기도 조절합니다. */}
      <Typography variant="h5" sx={{ mb: 3, fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
        전달하실 축의금을 선택해주세요
      </Typography>

      {/* ===== 여기가 핵심! 반응형 Grid 설정 ===== */}
      <Grid container spacing={2} justifyContent="center">
        {amounts.map((amount) => (
          // 화면이 작을 땐(xs) 한 줄에 2개(50%), 조금 커지면(sm) 한 줄에 4개(25%)씩 보이도록 설정
          <Grid item xs={6} sm={3} key={amount}>
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

      <Box display="flex" alignItems="center" my={3}>
        <IconButton onClick={decreaseAmount} color="primary" aria-label="금액 감소">
          {/* 화면 크기에 따라 아이콘 크기도 조절합니다. */}
          <RemoveCircleOutlineIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
        </IconButton>

        <TextField
          label="선택한 금액"
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
              fontSize: { xs: '1.2rem', sm: '1.5rem' }, // 입력창 글자 크기도 반응형으로
            },
          }}
        />

        <IconButton onClick={increaseAmount} color="primary" aria-label="금액 증가">
          <AddCircleOutlineIcon sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }} />
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