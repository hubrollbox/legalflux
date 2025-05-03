
import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { UserRole, Permission, DEFAULT_ROLE_PERMISSIONS } from '../types/permissions';

export const usePermissions = () => {
  const { user, isLoading } = useAuth();

  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // Check if the user has the specific permission
    if (user.permissions?.includes(permission)) {
      return true;
    }
    
    // Check if the user's role has the permission
    if (user.role) {
      const rolePermissions = DEFAULT_ROLE_PERMISSIONS[user.role];
      return rolePermissions?.includes(permission as Permission) || false;
    }
    
    return false;
  };

  const permissions = useMemo(() => {
    if (!user?.role) return [];
    return DEFAULT_ROLE_PERMISSIONS[user.role] || [];
  }, [user?.role]);

  return {
    hasRole,
    hasPermission,
    permissions,
    isLoading,
  };
};
