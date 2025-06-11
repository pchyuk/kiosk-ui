// src/App.jsx
import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';

// ... (다른 컴포넌트 import 구문은 이전과 동일) ...
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
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
  },
});

function App() {
  // ... (useState, nextStep, renderStep 등 함수 부분은 이전과 동일) ...
  const [step, setStep] = useState('welcome');
  const [guestInfo, setGuestInfo] = useState({
    side: '', name: '', amount: 0, paymentMethod: '', ticketCount: 1,
  });

  const updateGuestInfo = (data) => setGuestInfo((prev) => ({ ...prev, ...data }));

  const nextStep = () => {
     switch (step) {
      case 'welcome': setStep('selectSide'); break;
      case 'selectSide': setStep('enterName'); break;
      case 'enterName': setStep('enterAmount'); break;
      case 'enterAmount': setStep('selectPayment'); break;
      case 'selectPayment': 
        setStep('processing');
        setTimeout(() => setStep('mealTicket'), 3000);
        break;
      case 'mealTicket': 
        setStep('completion');
        console.log('Final Data:', guestInfo);
        setTimeout(() => setStep('welcome'), 5000);
        break;
      default: setStep('welcome');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'welcome': return <WelcomeScreen onStart={nextStep} />;
      case 'selectSide': return <SelectSideScreen onSelect={(side) => { updateGuestInfo({ side }); nextStep(); }} />;
      case 'enterName': return <EnterNameScreen onConfirm={(name) => { updateGuestInfo({ name }); nextStep(); }} />;
      case 'enterAmount': return <EnterAmountScreen onConfirm={(amount) => { updateGuestInfo({ amount }); nextStep(); }} />;
      case 'selectPayment': return <SelectPaymentScreen onSelect={(method) => { updateGuestInfo({ paymentMethod: method }); nextStep(); }} />;
      case 'processing': return <ProcessingScreen paymentMethod={guestInfo.paymentMethod} />;
      case 'mealTicket': return <MealTicketScreen onConfirm={(count) => { updateGuestInfo({ ticketCount: count }); nextStep(); }} />;
      case 'completion': return <CompletionScreen name={guestInfo.name} />;
      default: return <WelcomeScreen onStart={nextStep} />;
    }
  };

  return (
    <ThemeProvider theme={weddingTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Container maxWidth="sm">
            {/* 흰색 카드의 안쪽 여백(padding)을 화면 크기에 따라 조절합니다. */}
            <Box sx={{ p: { xs: 2, sm: 4 }, bgcolor: 'white', borderRadius: 4, boxShadow: 3 }}>
                {renderStep()}
            </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;