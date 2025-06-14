import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import api from './api/axios';

import WelcomeScreen from './screens/WelcomeScreen.jsx';
import SelectSideScreen from './screens/SelectSideScreen.jsx';
import EnterNameScreen from './screens/EnterNameScreen.jsx';
import EnterAmountScreen from './screens/EnterAmountScreen.jsx';
import SelectPaymentScreen from './screens/SelectPaymentScreen.jsx';
import ProcessingScreen from './screens/ProcessingScreen.jsx';
import MealTicketScreen from './screens/MealTicketScreen.jsx';
import CompletionScreen from './screens/CompletionScreen.jsx';

// 원래의 테마 설정
const weddingTheme = createTheme({
  palette: {
    primary: { main: '#6D8A96' },
    secondary: { main: '#D4B2A7' },
    background: { default: '#F9F6F2' },
  },
  typography: {
    fontFamily: '"Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
  },
});

function App() {
  const [step, setStep] = useState('welcome');
  const [guestInfo, setGuestInfo] = useState({
    side: '', name: '', amount: 0, paymentMethod: '', ticketCount: 1,
  });

  const updateGuestInfo = (data) => setGuestInfo((prev) => ({ ...prev, ...data }));

  const nextStep = async (data) => {
    switch (step) {
      case 'welcome': setStep('selectSide'); break;
      case 'selectSide': setStep('enterName'); break;
      case 'enterName': setStep('enterAmount'); break;
      case 'enterAmount': setStep('selectPayment'); break;
      case 'selectPayment': setStep('processing'); break;
      case 'processing': setStep('mealTicket'); break;
      case 'mealTicket':
        try {
          const finalGuestInfo = { ...guestInfo, ticketCount: data };
          updateGuestInfo({ ticketCount: data });
          await api.post('/guests', finalGuestInfo);
          setStep('completion');
        } catch (error) {
          console.error('데이터 전송에 실패했습니다:', error);
          alert('데이터 저장에 실패했습니다. 다시 시도해주세요.');
          setStep('welcome');
        }
        break;
      case 'completion':
        setGuestInfo({ side: '', name: '', amount: 0, paymentMethod: '', ticketCount: 1 });
        setStep('welcome');
        break;
      default: setStep('welcome');
    }
  };

  const renderStep = () => {
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
    <ThemeProvider theme={weddingTheme}>
      <CssBaseline />
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