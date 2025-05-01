
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Processes from './pages/Processes';
import Clients from './pages/Clients';
import Documents from './pages/Documents';
import Calendar from './pages/Calendar';
import Financial from './pages/Financial';
import UserManagement from './pages/client-portal/UserManagement';
import ClientPortal from './pages/client-portal/ClientPortal';
import ProcessesPage from './pages/client-portal/ProcessesPage';
import DocumentsPage from './pages/client-portal/DocumentsPage';
import BillingPage from './pages/client-portal/BillingPage';
import CommunicationsPage from './pages/client-portal/CommunicationsPage';
import ProfilePage from './pages/client-portal/ProfilePage';

import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

const router = createBrowserRouter([
  // Rotas públicas
  {
    path: "/login",
    element: <AuthLayout title="Iniciar Sessão"><Login /></AuthLayout>
  },
  {
    path: "/register",
    element: <AuthLayout title="Registar Conta"><Register /></AuthLayout>
  },
  
  // Rotas protegidas para o dashboard principal
  {
    path: "/",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "processos",
        element: <Processes />
      },
      {
        path: "clientes",
        element: <Clients />
      },
      {
        path: "documentos",
        element: <Documents />
      },
      {
        path: "calendario",
        element: <Calendar />
      },
      {
        path: "financeiro",
        element: <Financial />
      },
      {
        path: "gestao-utilizadores",
        element: <UserManagement />
      }
    ]
  },
  
  // Rotas para o portal do cliente
  {
    path: "/portal-cliente",
    element: <ProtectedRoute><ClientPortal /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <ProcessesPage />
      },
      {
        path: "processos",
        element: <ProcessesPage />
      },
      {
        path: "documentos",
        element: <DocumentsPage />
      },
      {
        path: "faturacao",
        element: <BillingPage />
      },
      {
        path: "comunicacoes",
        element: <CommunicationsPage />
      },
      {
        path: "perfil",
        element: <ProfilePage />
      }
    ]
  },
  
  // Rota para 404
  {
    path: "*",
    element: <NotFound />
  }
]);

export default router;
