
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/supabase";
import { useAuth } from "./useAuth";
import { UserRole, Permission, DEFAULT_ROLE_PERMISSIONS } from "../types/permissions";

interface PermissionsContextType {
  userPermissions: Permission[];
  hasPermission: (permission: string, action?: string) => boolean;
  hasRole: (role: string) => boolean;
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  fetchPermissions: () => Promise<void>;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userPermissions, setUserPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!user) {
        setUserPermissions([]);
        return;
      }

      // Buscar permissões customizadas do usuário na tabela correta
      const { data: customPermissions, error: permissionsError } = await supabase
        .from('permissoes')
        .select('*')
        .eq('user_id', user.id);

      if (permissionsError) {
        console.error('Error fetching permissions:', permissionsError);
        throw permissionsError;
      }

      if (customPermissions && customPermissions.length > 0 && customPermissions[0].tipo) {
        // Usuário tem permissões customizadas
        setUserPermissions([customPermissions[0].tipo] as unknown as Permission[]);
      } else {
        // Fallback para permissões padrão por role
        const role = user.role || 'client';
        setUserPermissions((DEFAULT_ROLE_PERMISSIONS[role] || []) as unknown as Permission[]);
      }
    } catch (err: any) {
      console.error('Permissions fetch error:', err);
      setError(err.message || 'Failed to load permissions');
    } finally {
      setLoading(false);
    }
  };

  // When user changes, fetch updated permissions
  useEffect(() => {
    fetchPermissions();
  }, [user]);

  const hasPermission = (permission: string, action?: string): boolean => {
    if (action) {
      return userPermissions.includes(`${permission}:${action}` as any) || userPermissions.includes("ADMIN_ACCESS" as any);
    }
    return userPermissions.includes(permission as any) || userPermissions.includes("ADMIN_ACCESS" as any);
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const value = {
    userPermissions,
    hasPermission,
    hasRole,
    loading,
    isLoading: loading,
    error,
    fetchPermissions
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};
