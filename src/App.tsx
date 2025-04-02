
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import LandingPage from "./pages/landing"; // Updated import path
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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

            {/* Protected Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/users" element={<Users />} />
            <Route path="/cases" element={<Navigate to="/dashboard" />} />
            <Route path="/tasks" element={<Navigate to="/dashboard" />} />
            <Route path="/documents" element={<Navigate to="/dashboard" />} />
            <Route path="/clients" element={<Navigate to="/dashboard" />} />
            <Route path="/calendar" element={<Navigate to="/dashboard" />} />
            <Route path="/messages" element={<Navigate to="/dashboard" />} />
            <Route path="/financial" element={<Navigate to="/dashboard" />} />
            <Route path="/settings" element={<Navigate to="/dashboard" />} />
            <Route path="/profile" element={<Navigate to="/dashboard" />} />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
