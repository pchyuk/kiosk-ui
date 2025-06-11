// src/screens/MealTicketScreen.jsx

import React, { useState } from 'react';
import { Typography, Button, Box, IconButton, Alert } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const MealTicketScreen = ({ onConfirm }) => {
  const [count, setCount] = useState(1);
  const showWarning = count > 2;

  return (
    <Box textAlign="center">
      <Typography variant="h5" gutterBottom>식권은 몇 장 필요하신가요?</Typography>
      <Box display="flex" alignItems="center" justifyContent="center" my={3}>
        <IconButton color="primary" onClick={() => setCount(Math.max(1, count - 1))}>
          <RemoveCircleOutlineIcon fontSize="large" />
        </IconButton>
        <Typography variant="h4" mx={4}>{count}</Typography>
        <IconButton color="primary" onClick={() => setCount(count + 1)}>
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </Box>
      {showWarning && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          2장을 초과하여 발급됩니다.
        </Alert>
      )}
      <Button variant="contained" size="large" onClick={() => onConfirm(count)}>
        식권 개수 확정
      </Button>
    </Box>
  );
};

export default MealTicketScreen;