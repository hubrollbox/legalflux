
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { toast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  module?: string;
  action?: 'create' | 'read' | 'update' | 'delete';
}

const ProtectedRoute = ({ 
  children, 
  module = '', 
  action = 'read' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { hasPermission, loading: permissionsLoading } = usePermissions();
  const location = useLocation();
  
  // If still loading auth state, show nothing (or a loading spinner)
  if (authLoading || permissionsLoading) {
    return <div className="flex items-center justify-center h-screen">A carregar...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If module is specified, check permissions
  if (module && !hasPermission(module, action)) {
    toast({
      title: "Acesso negado",
      description: "Não tem permissões para aceder a esta página.",
      variant: "destructive"
    });
    return <Navigate to="/dashboard" replace />;
  }
  
  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
