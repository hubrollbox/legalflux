
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ClientPortal from '../pages/client-portal/ClientPortal';
import NotFound from '../pages/NotFound';
import LandingPage from '../pages/landing/LandingPage';
import { useAuth } from '../hooks/useAuth';
import Screenshots from '../pages/Central de Ajuda/Screenshots';
import Support from '../pages/Central de Ajuda/Support';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      
      {/* Rotas protegidas */}
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/client-portal/*" 
        element={
          <ProtectedRoute>
            <ClientPortal />
          </ProtectedRoute>
        } 
      />
      
      {/* Central de Ajuda */}
      <Route path="/central-de-ajuda/support" element={<Support />} />
      <Route path="/central-de-ajuda/screenshots" element={<Screenshots />} />

      
      {/* Rota para página não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
