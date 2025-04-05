
import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ClientPortal from './pages/client-portal/ClientPortal';
import ProcessesPage from './pages/client-portal/ProcessesPage';
import CommunicationsPage from './pages/client-portal/CommunicationsPage';
import DocumentsPage from './pages/client-portal/DocumentsPage';
import BillingPage from './pages/client-portal/BillingPage';
import ProfilePage from './pages/client-portal/ProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Subscriptions from './pages/Subscriptions';
import Users from './pages/Users';
import Processes from './pages/Processes';
import Tasks from './pages/Tasks';
import Documents from './pages/Documents';
import Clients from './pages/Clients';
import CalendarPage from './pages/Calendar';
import Messages from './pages/Messages';
import Financial from './pages/Financial';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Screenshots from './pages/Central de Ajuda';
import About from './pages/About';
import Features from './pages/Features';
import Integrations from './pages/Integrations';
import Security from './pages/Security';
import UsefulLinks from './pages/Usefullinks';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import LandingPage from './pages/landing';

const router = createBrowserRouter([
  // Página inicial
  { path: '/', element: <LandingPage /> },
  
  // Rotas públicas
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/screenshots', element: <Screenshots /> },
  { path: '/about', element: <About /> },
  { path: '/features', element: <Features /> },
  { path: '/security', element: <Security /> },
  { path: '/integrations', element: <Integrations /> },
  { path: '/terms', element: <Terms /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/cookies', element: <Cookies /> },

  // Rotas protegidas por perfil
  // Portal do Cliente - apenas para clientes
  {
    path: '/client-portal',
    element: (
      <ProtectedRoute allowedRoles={['client']}>
        <ClientPortal />
      </ProtectedRoute>
    ),
    children: [
      { path: 'processes', element: <ProcessesPage /> },
      { path: 'communications', element: <CommunicationsPage /> },
      { path: 'documents', element: <DocumentsPage /> },
      { path: 'billing', element: <BillingPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { index: true, element: <Navigate to="processes" replace /> }
    ]
  },
  
  // Dashboard - para advogados, administradores e assistentes
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'lawyer', 'senior_lawyer', 'assistant']}>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  
  // Rotas específicas para cada funcionalidade do dashboard
  {
    path: '/processes',
    element: (
      <ProtectedRoute module="processes" allowedRoles={['admin', 'lawyer', 'senior_lawyer', 'assistant']}>
        <Processes />
      </ProtectedRoute>
    )
  },
  {
    path: '/tasks',
    element: (
      <ProtectedRoute module="tasks" allowedRoles={['admin', 'lawyer', 'senior_lawyer', 'assistant']}>
        <Tasks />
      </ProtectedRoute>
    )
  },
  {
    path: '/documents',
    element: (
      <ProtectedRoute module="documents" allowedRoles={['admin', 'lawyer', 'senior_lawyer', 'assistant']}>
        <Documents />
      </ProtectedRoute>
    )
  },
  {
    path: '/clients',
    element: (
      <ProtectedRoute module="clients" allowedRoles={['admin', 'lawyer', 'senior_lawyer']}>
        <Clients />
      </ProtectedRoute>
    )
  },
  {
    path: '/calendar',
    element: (
      <ProtectedRoute module="calendar" allowedRoles={['admin', 'lawyer', 'senior_lawyer', 'assistant']}>
        <CalendarPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/messages',
    element: (
      <ProtectedRoute module="messages" allowedRoles={['admin', 'lawyer', 'senior_lawyer', 'assistant']}>
        <Messages />
      </ProtectedRoute>
    )
  },
  {
    path: '/financial',
    element: (
      <ProtectedRoute module="financial" allowedRoles={['admin', 'senior_lawyer']}>
        <Financial />
      </ProtectedRoute>
    )
  },
  {
    path: '/subscriptions',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Subscriptions />
      </ProtectedRoute>
    )
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute module="users" allowedRoles={['admin', 'senior_lawyer']}>
        <Users />
      </ProtectedRoute>
    )
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute module="settings" allowedRoles={['admin', 'senior_lawyer', 'lawyer', 'assistant']}>
        <Settings />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'senior_lawyer', 'lawyer', 'assistant']}>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/useful-links',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'senior_lawyer', 'lawyer', 'assistant']}>
        <UsefulLinks />
      </ProtectedRoute>
    )
  },

  // Redirecionamentos
  { path: '/cases', element: <Navigate to="/processes" /> },
  { path: '/plans', element: <Navigate to="/subscriptions" /> },
  { path: '/links', element: <Navigate to="/useful-links" /> },

  // Rota de fallback
  { path: '*', element: <NotFound /> }
]);

export default router;
