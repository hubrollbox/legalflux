
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { Permission, DEFAULT_ROLE_PERMISSIONS } from "@/types/permissions";

interface PermissionsContextType {
  userPermissions: Permission[];
  hasPermission: (permission: Permission) => boolean;
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

      // Attempt to fetch custom permissions for the user from the permissions table
      const { data: customPermissions, error: permissionsError } = await supabase
        .from('permissions')
        .select('*')
        .eq('user_id', user.id);

      if (permissionsError) {
        console.error('Error fetching permissions:', permissionsError);
        throw permissionsError;
      }

      if (customPermissions && customPermissions.length > 0) {
        // User has custom permissions
        setUserPermissions(customPermissions[0].permissions as Permission[]);
      } else {
        // Fall back to role-based default permissions
        const role = user.role || 'client';
        setUserPermissions(DEFAULT_ROLE_PERMISSIONS[role] || []);
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

  const hasPermission = (permission: Permission): boolean => {
    return userPermissions.includes(permission) || userPermissions.includes('ADMIN_ACCESS');
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
