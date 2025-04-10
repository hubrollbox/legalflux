
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Removida a importação do react-router-dom
import { AuthProvider } from "@/components/auth/AuthProvider";
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

// Pages relacionadas à IA
import LawyerAssistant from "./pages/AI/LawyerAssistant";

// Client Portal
import ClientPortal from "./pages/client-portal/ClientPortal";
import ProcessesPage from "./pages/client-portal/ProcessesPage";
import CommunicationsPage from "./pages/client-portal/CommunicationsPage";
import DocumentsPage from "./pages/client-portal/DocumentsPage";
import DocumentTypes from "./pages/client-portal/DocumentTypes";
import BillingPage from "./pages/client-portal/BillingPage";
import ProfilePage from "./pages/client-portal/ProfilePage";
import AIAssistant from "./pages/client-portal/AIAssistant";

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
          {/* Next.js file-based routing automatically handles these pages */}
          <LandingPage />

        </TooltipProvider>
      </PermissionsProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
