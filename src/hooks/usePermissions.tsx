
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { UserRole, Permission, RolePermission } from '../types/permissions';

interface PermissionsContextType {
  hasPermission: (module: string, action?: 'create' | 'read' | 'update' | 'delete') => boolean;
  hasRole: (role: UserRole) => boolean;
  loading: boolean;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

// Definição das permissões para cada role
const rolePermissions: RolePermission[] = [
  {
    role: UserRole.ADMIN,
    permissions: [
      { module: '*', action: 'create' },
      { module: '*', action: 'read' },
      { module: '*', action: 'update' },
      { module: '*', action: 'delete' }
    ]
  },
  {
    role: UserRole.SENIOR_LAWYER,
    permissions: [
      { module: 'process', action: 'create' },
      { module: 'process', action: 'read' },
      { module: 'process', action: 'update' },
      { module: 'process', action: 'delete' },
      { module: 'document', action: 'create' },
      { module: 'document', action: 'read' },
      { module: 'document', action: 'update' },
      { module: 'document', action: 'delete' },
      { module: 'client', action: 'create' },
      { module: 'client', action: 'read' },
      { module: 'client', action: 'update' },
      { module: 'client', action: 'delete' },
      { module: 'calendar', action: 'create' },
      { module: 'calendar', action: 'read' },
      { module: 'calendar', action: 'update' },
      { module: 'calendar', action: 'delete' },
      { module: 'financial', action: 'read' },
      { module: 'lawyer', action: 'read' },
      { module: 'assistant', action: 'create' },
      { module: 'assistant', action: 'read' },
      { module: 'assistant', action: 'update' },
      { module: 'assistant', action: 'delete' }
    ]
  },
  {
    role: UserRole.LAWYER,
    permissions: [
      { module: 'process', action: 'create' },
      { module: 'process', action: 'read' },
      { module: 'process', action: 'update' },
      { module: 'document', action: 'create' },
      { module: 'document', action: 'read' },
      { module: 'document', action: 'update' },
      { module: 'client', action: 'create' },
      { module: 'client', action: 'read' },
      { module: 'client', action: 'update' },
      { module: 'calendar', action: 'create' },
      { module: 'calendar', action: 'read' },
      { module: 'calendar', action: 'update' },
      { module: 'financial', action: 'read' },
      { module: 'assistant', action: 'read' }
    ]
  },
  {
    role: UserRole.ASSISTANT,
    permissions: [
      { module: 'process', action: 'read' },
      { module: 'document', action: 'create' },
      { module: 'document', action: 'read' },
      { module: 'document', action: 'update' },
      { module: 'client', action: 'read' },
      { module: 'calendar', action: 'read' },
      { module: 'calendar', action: 'update' }
    ]
  },
  {
    role: UserRole.CLIENT,
    permissions: [
      { module: 'process', action: 'read' },
      { module: 'document', action: 'read' },
      { module: 'calendar', action: 'read' },
      { module: 'financial', action: 'read' }
    ]
  }
];

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simular um tempo de carregamento para verificação de permissões
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const hasPermission = (module: string, action: 'create' | 'read' | 'update' | 'delete' = 'read'): boolean => {
    if (!user) return false;
    
    const userRolePermissions = rolePermissions.find(rp => rp.role === user.role);
    if (!userRolePermissions) return false;
    
    return userRolePermissions.permissions.some(
      permission => 
        (permission.module === '*' || permission.module === module) && 
        (permission.action === action)
    );
  };
  
  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
  };
  
  return (
    <PermissionsContext.Provider value={{ hasPermission, hasRole, loading }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = (): PermissionsContextType => {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};
