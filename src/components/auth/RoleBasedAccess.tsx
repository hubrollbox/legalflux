
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../types/permissions';

interface RoleBasedAccessProps {
  requiredRole?: UserRole;
  requiredPermission?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({
  requiredRole,
  requiredPermission,
  children,
  fallback
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { hasRole, hasPermission, isLoading } = usePermissions();
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  
  useEffect(() => {
    if (isLoading) return;
    
    let access = true;
    
    if (requiredRole && !hasRole(requiredRole)) {
      access = false;
    }
    
    if (requiredPermission && !hasPermission(requiredPermission)) {
      access = false;
    }
    
    setHasAccess(access);
  }, [requiredRole, requiredPermission, hasRole, hasPermission, isLoading]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }
  
  if (!hasAccess) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="pt-6 flex flex-col items-center text-center">
          <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Acesso Restrito</h2>
          <p className="text-muted-foreground mb-6">
            Não tem permissões suficientes para aceder a este conteúdo.
            {user && (
              <span className="block mt-2">
                Está a usar a conta <strong>{user.email}</strong> com a função <strong>{user.role}</strong>.
              </span>
            )}
          </p>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              Voltar ao Início
            </Button>
            <Button onClick={() => navigate('/login')}>
              <Shield className="mr-2 h-4 w-4" /> Mudar de Conta
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return <>{children}</>;
};

export default RoleBasedAccess;
