
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import AppRoutes from './routes/AppRoutes';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster position="top-right" closeButton />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
