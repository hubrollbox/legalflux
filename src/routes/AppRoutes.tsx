
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
import Features from '../pages/Features';
import Pricing from '../pages/Pricing';
import Integrations from '../pages/Integrations';
import Processes from '../pages/Processes';
import Clients from '../pages/Clients';
import Documents from '../pages/Documents';
import Calendar from '../pages/Calendar';
import Financial from '../pages/Financial';
import UserManagement from '../pages/client-portal/UserManagement';
import Analytics from '../pages/Analytics';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ProcessesPage from '../pages/client-portal/ProcessesPage';
import DocumentsPage from '../pages/client-portal/DocumentsPage';
import BillingPage from '../pages/client-portal/BillingPage';
import CommunicationsPage from '../pages/client-portal/CommunicationsPage';
import ProfilePage from '../pages/client-portal/ProfilePage';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/about" element={<LandingPage />} />
      <Route path="/contact" element={<LandingPage />} />
      <Route path="/terms" element={<LandingPage />} />
      <Route path="/privacy" element={<LandingPage />} />
      {/* Rotas protegidas */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/processos" element={<ProtectedRoute><Processes /></ProtectedRoute>} />
      <Route path="/clientes" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
      <Route path="/documentos" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
      <Route path="/calendario" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
      <Route path="/financeiro" element={<ProtectedRoute><Financial /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
      <Route path="/integrations" element={<ProtectedRoute><Integrations /></ProtectedRoute>} />
      <Route path="/gestao-utilizadores" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
      {/* Portal do Cliente */}
      <Route path="/client-portal" element={<ProtectedRoute><ClientPortal /></ProtectedRoute>}>
        <Route index element={<Navigate to="/client-portal/processes" replace />} />
        <Route path="processes" element={<ProcessesPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="communications" element={<CommunicationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="/portal-cliente/*" element={<Navigate to="/client-portal" replace />} />
      {/* Central de Ajuda */}
      <Route path="/central-de-ajuda/support" element={<Support />} />
      <Route path="/central-de-ajuda/screenshots" element={<Screenshots />} />
      <Route path="/central-de-ajuda/docs" element={<Support />} />
      <Route path="/central-de-ajuda/faqs" element={<Support />} />
      <Route path="/central-de-ajuda/tutorials" element={<Support />} />
      {/* Rota para página não encontrada */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
