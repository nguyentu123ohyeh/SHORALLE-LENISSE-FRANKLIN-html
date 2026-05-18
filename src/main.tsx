import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { SetupModeProvider } from './contexts/SetupModeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SettingsProvider } from './contexts/SettingsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <SetupModeProvider>
          <LanguageProvider>
            <SettingsProvider>
              <App />
            </SettingsProvider>
          </LanguageProvider>
        </SetupModeProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>
);
