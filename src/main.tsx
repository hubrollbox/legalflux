
import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Workbox } from 'workbox-window';
import router from './router'
import './index.css'
import './styles/improved-interfaces.css'
import { AuthProvider } from './contexts/AuthProvider'
import { PermissionsProvider } from './hooks/usePermissions'
import { Toaster } from './components/ui/sonner'

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

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <PermissionsProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" closeButton />
      </PermissionsProvider>
    </AuthProvider>
  </React.StrictMode>
);
