
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Workbox } from 'workbox-window';
import router from './router';
import './index.css';
import { AuthProvider } from './hooks/useAuth';
import { PermissionsProvider } from './hooks/usePermissions';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from 'next-themes';

// Registrar service worker
if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');
  
  wb.addEventListener('installed', (event) => {
    if (event.isUpdate) {
      if (confirm('Nova versão disponível! Recarregar para atualizar?')) {
        window.location.reload();
      }
    }
  });
  
  wb.register().then(() => {
    console.info('Service Worker registrado com sucesso:', window.location.href);
  }).catch((error) => {
    console.error('Erro ao registrar Service Worker:', error);
  });
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <PermissionsProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" closeButton />
        </PermissionsProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
