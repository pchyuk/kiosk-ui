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

  // ******** 바로 이 부분의 구조가 변경되었습니다! ********
  return (
    <ThemeProvider theme={weddingTheme}>
      <CssBaseline />
      {/* 1. 이 Box가 전체 화면을 차지하며 Flex를 이용해 자식 요소를 정중앙에 배치합니다. */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
          bgcolor: 'background.default', // 배경색을 이 최상위 Box에서 설정
        }}
      >
        {/* 2. Container는 최대 너비를 제한하는 역할만 합니다. */}
        <Container maxWidth="sm">
            {/* 3. 실제 흰색 카드 UI 부분 */}
            <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 4, boxShadow: 3 }}>
                {renderStep()}
            </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;