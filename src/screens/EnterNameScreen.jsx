// src/screens/EnterNameScreen.jsx
import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

// 사용자 흐름 2: 이름 입력 
const EnterNameScreen = ({ onConfirm }) => {
  const [name, setName] = useState('');
  return (
    <Box textAlign="center">
      <Typography variant="h5" gutterBottom>성함을 입력해주세요</Typography>
      <TextField
        label="성함"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={() => onConfirm(name)} disabled={!name}>
        확인
      </Button>
    </Box>
  );
};
export default EnterNameScreen;