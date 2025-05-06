
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Registrar o service worker para Progressive Web App
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.info('Service Worker registrado com sucesso:', registration.scope);
    }).catch(error => {
      console.error('Erro ao registrar o Service Worker:', error);
    });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
