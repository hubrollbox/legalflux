
import { createRoot } from 'react-dom/client'
import { Workbox } from 'workbox-window';
import App from './App.tsx'
import './index.css'

// Register service worker
if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');
  
  wb.addEventListener('installed', (event) => {
    if (event.isUpdate) {
      if (confirm('Nova versão disponível! Recarregar para atualizar?')) {
        window.location.reload();
      }
    }
  });
  
  wb.register();
}

createRoot(document.getElementById("root")!).render(<App />);
