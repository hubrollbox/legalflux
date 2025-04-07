
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Workbox } from 'workbox-window';
import { RouterProvider } from 'react-router-dom'
import router from './router.tsx'
import './index.css'
import './styles/improved-interfaces.css'
import { AuthProvider } from '@/hooks/useAuth'
import { PermissionsProvider } from '@/hooks/usePermissions'

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
      </PermissionsProvider>
    </AuthProvider>
  </React.StrictMode>
);
