
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { UserRole, UserPermission } from "@/types/permissions";

interface PermissionsContextType {
  userRole: UserRole | null;
  permissions: UserPermission[];
  hasPermission: (module: string, permission: string) => boolean;
  setUserRole: (role: UserRole) => void;
  isLoading: boolean;
}

const PermissionsContext = createContext<PermissionsContextType>({
  userRole: null,
  permissions: [],
  hasPermission: () => false,
  setUserRole: () => {},
  isLoading: true
});

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [permissions, setPermissions] = useState<UserPermission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        // Simular carregamento de permissões baseado no papel do utilizador
        if (userRole) {
          const userPermissions = await getPermissionsForRole(userRole);
          setPermissions(userPermissions);
        }
      } catch (error) {
        console.error("Erro ao obter permissões:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userRole) {
      fetchPermissions();
    }
  }, [userRole]);

  const hasPermission = (module: string, permission: string): boolean => {
    if (!userRole) return false;
    
    // Administrador tem acesso total
    if (userRole === 'admin') return true;
    
    const modulePermissions = permissions.find(p => p.module === module);
    return modulePermissions ? modulePermissions.permissions.includes(permission as any) : false;
  };

  return (
    <PermissionsContext.Provider
      value={{
        userRole,
        permissions,
        hasPermission,
        setUserRole,
        isLoading
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

// Função simulada para obter permissões baseadas no papel do utilizador
async function getPermissionsForRole(role: UserRole): Promise<UserPermission[]> {
  // Simulação de chamada à API
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (role) {
        case 'client':
          resolve([
            { module: 'cases', permissions: ['read'] },
            { module: 'documents', permissions: ['read', 'create'] },
            { module: 'billing', permissions: ['read'] },
            { module: 'messages', permissions: ['read', 'create'] },
          ]);
          break;
        case 'lawyer':
          resolve([
            { module: 'cases', permissions: ['read', 'create', 'update'] },
            { module: 'documents', permissions: ['read', 'create', 'update', 'delete'] },
            { module: 'billing', permissions: ['read', 'create'] },
            { module: 'messages', permissions: ['read', 'create'] },
            { module: 'calendar', permissions: ['read', 'create', 'update'] },
          ]);
          break;
        case 'senior_lawyer':
          resolve([
            { module: 'cases', permissions: ['read', 'create', 'update', 'delete'] },
            { module: 'documents', permissions: ['read', 'create', 'update', 'delete'] },
            { module: 'billing', permissions: ['read', 'create', 'update'] },
            { module: 'messages', permissions: ['read', 'create'] },
            { module: 'calendar', permissions: ['read', 'create', 'update', 'delete'] },
            { module: 'users', permissions: ['read', 'update'] },
          ]);
          break;
        case 'assistant':
          resolve([
            { module: 'cases', permissions: ['read', 'update'] },
            { module: 'documents', permissions: ['read', 'create', 'update'] },
            { module: 'messages', permissions: ['read', 'create'] },
            { module: 'calendar', permissions: ['read', 'create', 'update'] },
          ]);
          break;
        case 'admin':
          resolve([
            { module: 'cases', permissions: ['read', 'create', 'update', 'delete'] },
            { module: 'documents', permissions: ['read', 'create', 'update', 'delete'] },
            { module: 'billing', permissions: ['read', 'create', 'update', 'delete'] },
            { module: 'messages', permissions: ['read', 'create', 'delete'] },
            { module: 'calendar', permissions: ['read', 'create', 'update', 'delete'] },
            { module: 'users', permissions: ['read', 'create', 'update', 'delete'] },
            { module: 'settings', permissions: ['read', 'update'] },
            { module: 'analytics', permissions: ['read'] },
            { module: 'subscriptions', permissions: ['read', 'create', 'update', 'delete'] },
          ]);
          break;
        default:
          resolve([]);
      }
    }, 300);
  });
}

export const usePermissions = () => useContext(PermissionsContext);
