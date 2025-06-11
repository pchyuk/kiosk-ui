// src/screens/SelectSideScreen.jsx
import React from 'react';
import { Typography, Button, Stack } from '@mui/material';

// 사용자 흐름 1: 신랑/신부 측 선택 
const SelectSideScreen = ({ onSelect }) => (
  <Stack spacing={4} alignItems="center">
    <Typography variant="h5">어느 분의 손님이신가요?</Typography>
    <Stack direction="row" spacing={3}>
      <Button variant="outlined" sx={{ p: 4 }} onClick={() => onSelect('groom')}>
        신랑 측 하객
      </Button>
      <Button variant="outlined" sx={{ p: 4 }} onClick={() => onSelect('bride')}>
        신부 측 하객
      </Button>
    </Stack>
  </Stack>
);
export default SelectSideScreen;