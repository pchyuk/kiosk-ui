// src/screens/SelectPaymentScreen.jsx
import React from 'react';
import { Typography, Button, Stack, Box } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// 사용자 흐름 4: 결제 방식 선택 
const SelectPaymentScreen = ({ onSelect }) => (
  <Box textAlign="center">
    <Typography variant="h5" gutterBottom>결제 수단을 선택해주세요</Typography>
    <Stack direction="row" spacing={3} justifyContent="center" mt={3}>
      <Button variant="contained" startIcon={<CreditCardIcon />} sx={{ p: 3 }} onClick={() => onSelect('card')}>
        카드 결제
      </Button>
      <Button variant="contained" startIcon={<AttachMoneyIcon />} sx={{ p: 3 }} onClick={() => onSelect('cash')}>
        현금 결제
      </Button>
    </Stack>
  </Box>
);
export default SelectPaymentScreen;