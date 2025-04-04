
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { PermissionsProvider } from "@/hooks/usePermissions";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import LandingPage from "./pages/landing"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import Users from "./pages/Users";
import Processes from "./pages/Processes";
import Tasks from "./pages/Tasks";
import Documents from "./pages/Documents";
import Clients from "./pages/Clients";
import CalendarPage from "./pages/Calendar";
import Messages from "./pages/Messages";
import Financial from "./pages/Financial";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Screenshots from "./pages/Central de Ajuda";
import About from "./pages/About";
import Features from "./pages/Features";
import Integrations from "./pages/Integrations";
import Security from "./pages/Security";
import UsefulLinks from "./pages/Usefullinks";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";

// Client Portal
import ClientPortal from "./pages/client-portal/ClientPortal";
import ProcessesPage from "./pages/client-portal/ProcessesPage";
import CommunicationsPage from "./pages/client-portal/CommunicationsPage";
import DocumentsPage from "./pages/client-portal/DocumentsPage";
import BillingPage from "./pages/client-portal/BillingPage";
import ProfilePage from "./pages/client-portal/ProfilePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PermissionsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/screenshots" element={<Screenshots />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/security" element={<Security />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/processes" element={
                <ProtectedRoute module="processes">
                  <Processes />
                </ProtectedRoute>
              } />
              <Route path="/tasks" element={
                <ProtectedRoute module="tasks">
                  <Tasks />
                </ProtectedRoute>
              } />
              <Route path="/documents" element={
                <ProtectedRoute module="documents">
                  <Documents />
                </ProtectedRoute>
              } />
              <Route path="/clients" element={
                <ProtectedRoute module="clients">
                  <Clients />
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={
                <ProtectedRoute module="calendar">
                  <CalendarPage />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute module="messages">
                  <Messages />
                </ProtectedRoute>
              } />
              <Route path="/financial" element={
                <ProtectedRoute module="financial">
                  <Financial />
                </ProtectedRoute>
              } />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/users" element={
                <ProtectedRoute module="users">
                  <Users />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute module="settings">
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/useful-links" element={
                <ProtectedRoute>
                  <UsefulLinks />
                </ProtectedRoute>
              } />

              {/* Portal do Cliente */}
              <Route path="/client-portal" element={
                <ProtectedRoute allowedRoles={['client']}>
                  <ClientPortal />
                </ProtectedRoute>
              }>
                <Route path="processes" element={<ProcessesPage />} />
                <Route path="communications" element={<CommunicationsPage />} />
                <Route path="documents" element={<DocumentsPage />} />
                <Route path="billing" element={<BillingPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route index element={<Navigate to="processes" replace />} />
              </Route>

              {/* Redirecionamentos */}
              <Route path="/cases" element={<Navigate to="/processes" />} />
              <Route path="/plans" element={<Navigate to="/subscriptions" />} />
              <Route path="/links" element={<Navigate to="/useful-links" />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PermissionsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
