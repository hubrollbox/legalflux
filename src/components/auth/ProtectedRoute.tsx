
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from "sonner";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const isLoading = !isAuthenticated && !user;

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user?.role === "client") {
    if (!location.pathname.startsWith("/client-portal") && location.pathname !== "/logout") {
      return <Navigate to="/client-portal" replace />;
    }
  } else if (["lawyer", "senior_lawyer", "assistant", "admin"].includes(user?.role || "")) {
    if (!location.pathname.startsWith("/dashboard") && location.pathname !== "/logout") {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
