
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface Permission {
  module: string;
  action: string;
}

export const usePermissions = () => {
  const { user, isLoading } = useAuth();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPermissions = async () => {
      // Aqui você carregaria as permissões do usuário do backend
      // Por enquanto vamos simular com base no papel do usuário
      if (user) {
        // Simulação simples - permissões baseadas no papel
        const userPermissions: Permission[] = [];
        
        switch (user.role) {
          case 'ADMIN':
            // Administradores têm acesso completo
            userPermissions.push(
              { module: 'users', action: 'create' },
              { module: 'users', action: 'read' },
              { module: 'users', action: 'update' },
              { module: 'users', action: 'delete' },
              { module: 'processes', action: 'create' },
              { module: 'processes', action: 'read' },
              { module: 'processes', action: 'update' },
              { module: 'processes', action: 'delete' },
              { module: 'billing', action: 'read' },
              { module: 'billing', action: 'update' },
              { module: 'reports', action: 'read' }
            );
            break;
          case 'LAWYER':
            // Advogados têm acesso a casos e clientes
            userPermissions.push(
              { module: 'processes', action: 'create' },
              { module: 'processes', action: 'read' },
              { module: 'processes', action: 'update' },
              { module: 'clients', action: 'read' },
              { module: 'documents', action: 'create' },
              { module: 'documents', action: 'read' },
              { module: 'documents', action: 'update' }
            );
            break;
          case 'CLIENT':
            // Clientes só podem ver seus próprios processos
            userPermissions.push(
              { module: 'processes', action: 'read' },
              { module: 'documents', action: 'read' },
              { module: 'messages', action: 'create' },
              { module: 'messages', action: 'read' }
            );
            break;
          default:
            break;
        }
        
        setPermissions(userPermissions);
      }
      setLoading(false);
    };

    if (!isLoading) {
      loadPermissions();
    }
  }, [user, isLoading]);

  const hasPermission = (module: string, action: string = 'read') => {
    if (!user) return false;
    
    // Administradores têm todas as permissões
    if (user.role === 'ADMIN') return true;
    
    return permissions.some(
      (permission) => 
        permission.module === module && permission.action === action
    );
  };

  return {
    hasPermission,
    isLoading: loading
  };
};
