// src/TicketPage.jsx

import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box } from '@mui/material';
import DynamicTicket from './components/DynamicTicket'; // 분리된 컴포넌트 import

const TicketPage = () => {
  const [searchParams] = useSearchParams();
  const guestInfo = {
    name: searchParams.get('name') || '',
    side: searchParams.get('side') || '',
    ticketCount: searchParams.get('count') || '1',
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#F9F6F2'
    }}>
      <DynamicTicket {...guestInfo} />
    </Box>
  );
};

export default TicketPage;