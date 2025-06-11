// src/App.jsx

import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';

import WelcomeScreen from './screens/WelcomeScreen.jsx';
import SelectSideScreen from './screens/SelectSideScreen.jsx';
import EnterNameScreen from './screens/EnterNameScreen.jsx';
import EnterAmountScreen from './screens/EnterAmountScreen.jsx';
import SelectPaymentScreen from './screens/SelectPaymentScreen.jsx';
import ProcessingScreen from './screens/ProcessingScreen.jsx';
import MealTicketScreen from './screens/MealTicketScreen.jsx'; // 다시 추가
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
  // guestInfo에 ticketCount를 다시 추가합니다.
  const [guestInfo, setGuestInfo] = useState({
    side: '', name: '', amount: 0, paymentMethod: '', ticketCount: 1,
  });

  const updateGuestInfo = (data) => setGuestInfo((prev) => ({ ...prev, ...data }));

  // 화면 전환 로직을 최종 수정합니다.
  const nextStep = (data) => {
    switch (step) {
      case 'welcome': setStep('selectSide'); break;
      case 'selectSide': setStep('enterName'); break;
      case 'enterName': setStep('enterAmount'); break;
      case 'enterAmount': setStep('selectPayment'); break;
      case 'selectPayment': setStep('processing'); break;
      case 'processing': setStep('mealTicket'); break;
      case 'mealTicket':
        // MealTicketScreen에서 받은 식권 개수(data)를 저장하고 completion으로 이동
        updateGuestInfo({ ticketCount: data });
        setStep('completion'); 
        break;
      case 'completion': 
        // Completion 화면에서 터치하면 첫 화면으로 돌아갑니다.
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
        // onConfirm에 nextStep을 전달하여, 확정 시 받은 데이터를 다음 단계로 넘깁니다.
        return <MealTicketScreen onConfirm={nextStep} />;
      case 'completion':
        // onConfirm으로 상태를 초기화하고 첫 화면으로 돌아가는 nextStep을 전달합니다.
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