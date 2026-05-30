import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Safely suppress benign and expected Vite WebSocket / HMR connection errors to keep the preview console pristine.
if (typeof window !== 'undefined') {
  const isViteOrWS = (msg: string) => {
    return (
      msg.includes('WebSocket') ||
      msg.includes('vite') ||
      msg.includes('ws://') ||
      msg.includes('wss://') ||
      msg.includes('HMR')
    );
  };

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason?.message || String(event.reason || '');
    if (isViteOrWS(reason)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const msg = event.message || '';
    if (isViteOrWS(msg)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

