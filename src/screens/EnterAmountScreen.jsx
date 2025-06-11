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
      <Typography variant="h5" sx={{ mb: 3, fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
        전달하실 축의금을 선택해주세요
      </Typography>

      {/* ===== Grid 컨테이너의 너비를 100%로 명확히 설정 ===== */}
      <Box sx={{ width: '100%', mb: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          {amounts.map((amount) => (
            // ===== 여기가 핵심! Grid 아이템의 너비를 직접 제어 =====
            // flexBasis를 이용해 너비를 직접 계산하여 할당합니다.
            // spacing={2}는 16px이므로, 50% 너비에서 8px을 빼서 간격을 보정합니다.
            <Grid 
              item 
              key={amount}
              sx={{
                flexBasis: {
                  xs: 'calc(50% - 8px)', // 작은 화면: 2개씩
                  sm: 'calc(25% - 12px)' // 큰 화면: 4개씩
                },
                maxWidth: {
                  xs: 'calc(50% - 8px)',
                  sm: 'calc(25% - 12px)'
                }
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                sx={{ py: 1.5, whiteSpace: 'nowrap' }} // whiteSpace: 'nowrap' 추가
                onClick={() => setCustomAmount(amount)}
              >
                {amount.toLocaleString()}원
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* '기타 금액' 입력 부분은 이전과 동일합니다. */}
      <Box display="flex" alignItems="center" my={3}>
        <IconButton onClick={decreaseAmount} color="primary" aria-label="금액 감소">
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
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
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