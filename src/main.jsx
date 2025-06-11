// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import TicketPage from './TicketPage.jsx'; // 새로 만든 식권 페이지
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 기본 주소('/')로는 키오스크 앱을 보여줍니다. */}
        <Route path="/" element={<App />} />
        {/* '/ticket' 주소로는 식권 페이지만 보여줍니다. */}
        <Route path="/ticket" element={<TicketPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);