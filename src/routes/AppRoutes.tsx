
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ClientPortal from '@/pages/client-portal/ClientPortal';
import Support from '@/pages/Central de Ajuda/Support';
import Screenshots from '@/pages/Central de Ajuda/Screenshots';
import Financial from '@/pages/Financial';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/central-de-ajuda" element={<Screenshots />} />
      <Route path="/central-de-ajuda/support" element={<Support />} />

      {/* Rotas Protegidas para o Portal do Cliente */}
      <Route path="/client-portal" element={
        <ProtectedRoute>
          <ClientPortal />
        </ProtectedRoute>
      } />

      {/* Rotas Protegidas para o Dashboard */}
      <Route path="/financial" element={
        <ProtectedRoute>
          <Financial />
        </ProtectedRoute>
      } />

      {/* Redirecionar outras rotas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
