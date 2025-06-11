// src/screens/CompletionScreen.jsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import DynamicTicket from '../components/DynamicTicket'; // 분리된 컴포넌트 import

const CompletionScreen = ({ guestInfo, onConfirm }) => {
  // .env 파일에 설정한 내 사이트 주소를 가져옵니다.
  const baseUrl = import.meta.env.VITE_SITE_URL;
  const ticketUrl = `${baseUrl}/ticket?name=${encodeURIComponent(guestInfo.name)}&side=${guestInfo.side}&count=${guestInfo.ticketCount}`;

  return (
    <Box
      onClick={onConfirm}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" sx={{ mb: 1 }}>
        {guestInfo.name}님, 감사합니다.
      </Typography>
      
      {/* 1. 화면에도 모바일 식권을 출력합니다. */}
      <DynamicTicket {...guestInfo} />
      
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        QR코드를 스캔하여 위 식권을 저장하세요.
      </Typography>

      {/* 2. QR코드는 이제 Netlify 주소로 연결됩니다. */}
      <QRCodeCanvas value={ticketUrl} size={180} />

      <Typography color="text.secondary" sx={{ mt: 3 }}>
        화면을 터치하면 처음으로 돌아갑니다.
      </Typography>
    </Box>
  );
};

export default CompletionScreen;