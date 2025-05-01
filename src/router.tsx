
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import LandingPage from './pages/landing/LandingPage';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import Support from './pages/Central de Ajuda/Support';
import Screenshots from './pages/Central de Ajuda/Screenshots';
import Tutorials from './pages/Central de Ajuda/Tutorials';
import ProtectedRoute from './components/auth/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/features',
    element: <Features />,
  },
  {
    path: '/pricing',
    element: <Pricing />,
  },
  {
    path: '/central-de-ajuda/support',
    element: <Support />,
  },
  {
    path: '/central-de-ajuda/screenshots',
    element: <Screenshots />,
  },
  {
    path: '/central-de-ajuda/tutorials',
    element: <Tutorials />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
