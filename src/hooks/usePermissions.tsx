
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { Permission, UserRole } from '@/types/permissions';

interface PermissionsContextType {
  hasPermission: (module: string, action: 'create' | 'read' | 'update' | 'delete') => boolean;
  userRole: UserRole | null;
  permissions: Permission[];
  isLoading: boolean;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Definir o papel do usuário com base no usuário atual
  const userRole = user?.role as UserRole || null;

  // Buscar permissões com base no papel do usuário
  useEffect(() => {
    const fetchPermissions = async () => {
      if (!userRole) {
        setPermissions([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Aqui implementaríamos a lógica real para buscar permissões da API
        // Por enquanto, vamos usar uma implementação simulada
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Permissões simuladas baseadas no papel do usuário
        const mockPermissions: Record<UserRole, Permission[]> = {
          [UserRole.CLIENT]: [
            { module: 'processes', action: 'read' },
            { module: 'documents', action: 'read' },
            { module: 'messages', action: 'create' },
            { module: 'messages', action: 'read' },
          ],
          [UserRole.LAWYER]: [
            { module: 'processes', action: 'create' },
            { module: 'processes', action: 'read' },
            { module: 'processes', action: 'update' },
            { module: 'documents', action: 'create' },
            { module: 'documents', action: 'read' },
            { module: 'documents', action: 'update' },
            { module: 'messages', action: 'create' },
            { module: 'messages', action: 'read' },
          ],
          [UserRole.SENIOR_LAWYER]: [
            { module: 'processes', action: 'create' },
            { module: 'processes', action: 'read' },
            { module: 'processes', action: 'update' },
            { module: 'processes', action: 'delete' },
            { module: 'documents', action: 'create' },
            { module: 'documents', action: 'read' },
            { module: 'documents', action: 'update' },
            { module: 'documents', action: 'delete' },
            { module: 'messages', action: 'create' },
            { module: 'messages', action: 'read' },
            { module: 'lawyers', action: 'read' },
          ],
          [UserRole.ASSISTANT]: [
            { module: 'processes', action: 'read' },
            { module: 'documents', action: 'read' },
            { module: 'documents', action: 'create' },
            { module: 'messages', action: 'create' },
            { module: 'messages', action: 'read' },
          ],
          [UserRole.ADMIN]: [
            { module: 'processes', action: 'create' },
            { module: 'processes', action: 'read' },
            { module: 'processes', action: 'update' },
            { module: 'processes', action: 'delete' },
            { module: 'documents', action: 'create' },
            { module: 'documents', action: 'read' },
            { module: 'documents', action: 'update' },
            { module: 'documents', action: 'delete' },
            { module: 'messages', action: 'create' },
            { module: 'messages', action: 'read' },
            { module: 'messages', action: 'delete' },
            { module: 'lawyers', action: 'create' },
            { module: 'lawyers', action: 'read' },
            { module: 'lawyers', action: 'update' },
            { module: 'lawyers', action: 'delete' },
            { module: 'clients', action: 'create' },
            { module: 'clients', action: 'read' },
            { module: 'clients', action: 'update' },
            { module: 'clients', action: 'delete' },
            { module: 'assistants', action: 'create' },
            { module: 'assistants', action: 'read' },
            { module: 'assistants', action: 'update' },
            { module: 'assistants', action: 'delete' },
            { module: 'subscriptions', action: 'create' },
            { module: 'subscriptions', action: 'read' },
            { module: 'subscriptions', action: 'update' },
            { module: 'subscriptions', action: 'delete' },
            { module: 'system', action: 'read' },
            { module: 'system', action: 'update' },
          ],
        };
        
        setPermissions(userRole ? mockPermissions[userRole] || [] : []);
      } catch (error) {
        console.error("Error fetching permissions:", error);
        setPermissions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPermissions();
  }, [userRole]);

  // Verificar se o usuário tem uma permissão específica
  const hasPermission = (module: string, action: 'create' | 'read' | 'update' | 'delete') => {
    if (!permissions.length) return false;
    
    return permissions.some(
      (permission) => permission.module === module && permission.action === action
    );
  };

  const value = {
    hasPermission,
    userRole,
    permissions,
    isLoading,
  };

  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>;
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions deve ser usado dentro de um PermissionsProvider');
  }
  return context;
};
