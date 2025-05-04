
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Processes from '../pages/Processes';
import Clients from '../pages/Clients';
import Documents from '../pages/Documents';
import Calendar from '../pages/Calendar';
import Financial from '../pages/Financial';
import UserManagement from '../pages/client-portal/UserManagement';
import ClientPortal from '../pages/client-portal/ClientPortal';
import ProcessesPage from '../pages/client-portal/ProcessesPage';
import DocumentsPage from '../pages/client-portal/DocumentsPage';
import BillingPage from '../pages/client-portal/BillingPage';
import CommunicationsPage from '../pages/client-portal/CommunicationsPage';
import ProfilePage from '../pages/client-portal/ProfilePage';

import AuthLayout from '../components/auth/AuthLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Rotas protegidas para o dashboard principal */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/processos" element={<Processes />} />
        <Route path="/clientes" element={<Clients />} />
        <Route path="/documentos" element={<Documents />} />
        <Route path="/calendario" element={<Calendar />} />
        <Route path="/financeiro" element={<Financial />} />
        <Route path="/gestao-utilizadores" element={<UserManagement />} />
      </Route>

      {/* Rotas para o portal do cliente */}
      <Route path="/portal-cliente" element={<ProtectedRoute><ClientPortal /></ProtectedRoute>}>
        <Route index element={<ProcessesPage />} />
        <Route path="processos" element={<ProcessesPage />} />
        <Route path="documentos" element={<DocumentsPage />} />
        <Route path="faturacao" element={<BillingPage />} />
        <Route path="comunicacoes" element={<CommunicationsPage />} />
        <Route path="perfil" element={<ProfilePage />} />
      </Route>
      
      {/* Rota para 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
