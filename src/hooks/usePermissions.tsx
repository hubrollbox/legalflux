
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { Permission, UserPermission } from "@/types/permissions";

interface UsePermissionsReturn {
  hasPermission: (module: string, action: Permission) => boolean;
  userPermissions: UserPermission[];
  isLoading: boolean;
}

export const usePermissions = (): UsePermissionsReturn => {
  const { user } = useAuth();
  const [userPermissions, setUserPermissions] = useState<UserPermission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPermissions = async () => {
      if (!user) {
        setUserPermissions([]);
        setIsLoading(false);
        return;
      }

      try {
        // Em uma aplicação real, buscaríamos as permissões da API
        // Aqui estamos simulando com permissões baseadas no role
        let permissions: UserPermission[] = [];

        switch (user.role) {
          case 'admin':
            permissions = [
              { module: 'users', permissions: ['create', 'read', 'update', 'delete'] },
              { module: 'cases', permissions: ['create', 'read', 'update', 'delete'] },
              { module: 'documents', permissions: ['create', 'read', 'update', 'delete'] },
              { module: 'billing', permissions: ['create', 'read', 'update', 'delete'] },
              { module: 'reports', permissions: ['create', 'read', 'update', 'delete'] },
              { module: 'settings', permissions: ['create', 'read', 'update', 'delete'] },
            ];
            break;
          case 'senior_lawyer':
            permissions = [
              { module: 'users', permissions: ['read'] },
              { module: 'cases', permissions: ['create', 'read', 'update', 'delete'] },
              { module: 'documents', permissions: ['create', 'read', 'update', 'delete'] },
              { module: 'billing', permissions: ['read'] },
              { module: 'reports', permissions: ['read'] },
              { module: 'settings', permissions: ['read'] },
            ];
            break;
          case 'lawyer':
            permissions = [
              { module: 'cases', permissions: ['create', 'read', 'update'] },
              { module: 'documents', permissions: ['create', 'read', 'update'] },
              { module: 'billing', permissions: ['read'] },
            ];
            break;
          case 'assistant':
            permissions = [
              { module: 'cases', permissions: ['read'] },
              { module: 'documents', permissions: ['create', 'read'] },
            ];
            break;
          case 'client':
            permissions = [
              { module: 'cases', permissions: ['read'] },
              { module: 'documents', permissions: ['read'] },
              { module: 'billing', permissions: ['read'] },
            ];
            break;
          default:
            permissions = [];
        }

        setUserPermissions(permissions);
      } catch (error) {
        console.error("Erro ao carregar permissões:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPermissions();
  }, [user]);

  const hasPermission = (module: string, action: Permission): boolean => {
    if (!user) return false;
    
    // Admins têm todas as permissões
    if (user.role === 'admin') return true;
    
    const modulePermissions = userPermissions.find(p => p.module === module);
    if (!modulePermissions) return false;
    
    return modulePermissions.permissions.includes(action);
  };

  return {
    hasPermission,
    userPermissions,
    isLoading
  };
};
