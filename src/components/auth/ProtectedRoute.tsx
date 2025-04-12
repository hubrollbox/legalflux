
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { toast } from "sonner";
import { UserRole } from "@/types";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  module?: string;
  action?: 'create' | 'read' | 'update' | 'delete';
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ 
  children, 
  module = '', 
  action = 'read',
  allowedRoles
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const { hasPermission, isLoading: permissionsLoading } = usePermissions();
  const location = useLocation();
  
  // Se ainda estiver a carregar o estado de autenticação, mostra um loader
  if (authLoading || permissionsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">A carregar...</p>
      </div>
    );
  }
  
  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Verifica se o utilizador tem a função permitida
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    toast.error("Acesso negado", {
      description: "Não tem permissões para aceder a esta página."
    });
    
    // Redirecionar para a página apropriada com base na função do utilizador
    if (user.role === "client") {
      return <Navigate to="/client-portal/processes" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  // Se um módulo for especificado, verifica permissões
  if (module && !hasPermission(module, action)) {
    toast.error("Acesso negado", {
      description: "Não tem permissões para aceder a esta funcionalidade."
    });
    
    // Redirecionar para a página apropriada com base na função do utilizador
    if (user?.role === "client") {
      return <Navigate to="/client-portal" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  // Se todas as verificações passarem, renderiza o conteúdo protegido
  return <>{children}</>;
};

export default ProtectedRoute;
