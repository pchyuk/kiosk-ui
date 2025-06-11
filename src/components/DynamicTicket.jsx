// src/components/DynamicTicket.jsx

import React from 'react';
import { Box, Typography } from '@mui/material';

const DynamicTicket = React.forwardRef(({ name, side, ticketCount }, ref) => (
  <Box
    ref={ref}
    sx={{
      width: '320px',
      padding: '20px',
      backgroundColor: 'white',
      color: '#333',
      fontFamily: 'sans-serif',
      border: '2px dashed #6D8A96',
      borderRadius: '15px',
      my: { xs: 2, sm: 3 },
    }}
  >
    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#6D8A96', textAlign: 'center' }}>
      모바일 식권
    </Typography>
    <Box sx={{ borderBottom: '1px solid #ddd', my: 2 }} />
    <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
      {name} 님
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
      <Typography>구분</Typography>
      <Typography sx={{ fontWeight: 'bold' }}>{side === 'groom' ? '신랑측' : '신부측'}</Typography>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', mt: 1 }}>
      <Typography>식권</Typography>
      <Typography sx={{ fontWeight: 'bold' }}>{ticketCount} 장</Typography>
    </Box>
    <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
      결혼식에 참석해주셔서 감사합니다.
    </Typography>
  </Box>
));

export default DynamicTicket;