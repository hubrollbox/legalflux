import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ClientPortal from './pages/client-portal/ClientPortal';
import ProcessesPage from './pages/client-portal/ProcessesPage';
import CommunicationsPage from './pages/client-portal/CommunicationsPage';
import DocumentsPage from './pages/client-portal/DocumentsPage';
import BillingPage from './pages/client-portal/BillingPage';
import ProfilePage from './pages/client-portal/ProfilePage';

const router = createBrowserRouter([
  // ... other routes ...
  {
    path: '/client-portal',
    element: <ProtectedRoute><ClientPortal /></ProtectedRoute>,
    children: [
      { path: 'processes', element: <ProcessesPage /> },
      { path: 'communications', element: <CommunicationsPage /> },
      { path: 'documents', element: <DocumentsPage /> },
      { path: 'billing', element: <BillingPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { index: true, element: <Navigate to="processes" replace /> }
    ]
  }
]);