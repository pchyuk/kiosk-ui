// kiosk-ui/src/App.jsx

import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import api from './api/axios'; // 방금 만든 axios 인스턴스를 가져옵니다.

// ... 다른 screen 컴포넌트 import는 이전과 동일 ...
import WelcomeScreen from './screens/WelcomeScreen.jsx';
import SelectSideScreen from './screens/SelectSideScreen.jsx';
import EnterNameScreen from './screens/EnterNameScreen.jsx';
import EnterAmountScreen from './screens/EnterAmountScreen.jsx';
import SelectPaymentScreen from './screens/SelectPaymentScreen.jsx';
import ProcessingScreen from './screens/ProcessingScreen.jsx';
import MealTicketScreen from './screens/MealTicketScreen.jsx';
import CompletionScreen from './screens/CompletionScreen.jsx';

const weddingTheme = createTheme({
    palette: {
    primary: { main: '#6D8A96' },
    secondary: { main: '#D4B2A7' },
    background: { default: '#F9F6F2' },
  },
  typography: {
    fontFamily: '"Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 }, h5: { fontWeight: 600 },
  },
});

function App() {
  const [step, setStep] = useState('welcome');
  const [guestInfo, setGuestInfo] = useState({
    side: '', name: '', amount: 0, paymentMethod: '', ticketCount: 1,
  });

  const updateGuestInfo = (data) => setGuestInfo((prev) => ({ ...prev, ...data }));

  // API 요청은 비동기로 처리되므로, 함수에 async를 붙여줍니다.
  const nextStep = async (data) => {
    switch (step) {
      case 'welcome': setStep('selectSide'); break;
      case 'selectSide': setStep('enterName'); break;
      case 'enterName': setStep('enterAmount'); break;
      case 'enterAmount': setStep('selectPayment'); break;
      case 'selectPayment': setStep('processing'); break;
      case 'processing': setStep('mealTicket'); break;
      case 'mealTicket':
        // ===== 여기가 핵심! 백엔드로 데이터를 전송합니다. =====
        try {
          // 식권 개수를 먼저 guestInfo에 저장합니다.
          const finalGuestInfo = { ...guestInfo, ticketCount: data };
          updateGuestInfo({ ticketCount: data });
          
          console.log('백엔드로 전송할 데이터:', finalGuestInfo);
          
          // '/guests' 경로로 POST 요청을 보냅니다.
          await api.post('/guests', finalGuestInfo);

          // 성공적으로 전송되면 다음 단계로 넘어갑니다.
          setStep('completion');

        } catch (error) {
          console.error('데이터 전송에 실패했습니다:', error);
          alert('데이터 저장에 실패했습니다. 다시 시도해주세요.');
          setStep('welcome'); // 오류 발생 시 첫 화면으로
        }
        break;
      // =======================================================
      case 'completion':
        setGuestInfo({ side: '', name: '', amount: 0, paymentMethod: '', ticketCount: 1 });
        setStep('welcome');
        break;
      default: setStep('welcome');
    }
  };

  const renderStep = () => {
    // ... renderStep 함수 내용은 이전과 동일 ...
    switch (step) {
      case 'welcome':
        return <WelcomeScreen onStart={nextStep} />;
      case 'selectSide':
        return <SelectSideScreen onSelect={(side) => { updateGuestInfo({ side }); nextStep(); }} />;
      case 'enterName':
        return <EnterNameScreen onConfirm={(name) => { updateGuestInfo({ name }); nextStep(); }} />;
      case 'enterAmount':
        return <EnterAmountScreen onConfirm={(amount) => { updateGuestInfo({ amount }); nextStep(); }} />;
      case 'selectPayment':
        return <SelectPaymentScreen onSelect={(method) => { updateGuestInfo({ paymentMethod: method }); nextStep(); }} />;
      case 'processing':
        return <ProcessingScreen paymentMethod={guestInfo.paymentMethod} onConfirm={nextStep} />;
      case 'mealTicket':
        return <MealTicketScreen onConfirm={nextStep} />;
      case 'completion':
        return <CompletionScreen guestInfo={guestInfo} onConfirm={nextStep} />;
      default:
        return <WelcomeScreen onStart={nextStep} />;
    }
  };

  return (
    // ... return 안의 JSX 내용은 이전과 동일 ...
    <ThemeProvider theme={weddingTheme}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', minHeight: '100vh', py: { xs: 2, sm: 0 } }}>
        <Container maxWidth="sm">
            <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: 'white', borderRadius: 4, boxShadow: 3 }}>
                {renderStep()}
            </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;