import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Inclusive Sans (variable 300–700), self-hosted: no request to third-party font servers.
import '@fontsource-variable/inclusive-sans';
import './index.css';
import App from './App.jsx';
import LanguageProvider from './i18n/LanguageProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
