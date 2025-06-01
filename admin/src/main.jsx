
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Ensure createRoot is imported
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
