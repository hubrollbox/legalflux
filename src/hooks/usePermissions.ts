
import { useState, useEffect } from 'react';
import { UserRole, DEFAULT_ROLE_PERMISSIONS, Permission } from '../types/permissions';
import { useAuth } from './useAuth';

export const usePermissions = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading permissions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const hasRole = (role: UserRole): boolean => {
    if (!user) return false;
    return user.role === role;
  };
  
  const hasPermission = (permission: string, action?: string): boolean => {
    if (!user) return false;
    
    const userRole = user.role as keyof typeof DEFAULT_ROLE_PERMISSIONS;
    const userPermissions = DEFAULT_ROLE_PERMISSIONS[userRole] || [];
    
    // Admin has all permissions
    if (userRole === UserRole.ADMIN) return true;
    
    // Check if the user has specific permission
    if (action) {
      return userPermissions.includes(`${permission.toUpperCase()}_${action.toUpperCase()}` as Permission);
    }
    
    // Check if the user has any permission for this module
    return userPermissions.some(p => p.startsWith(`${permission.toUpperCase()}_`));
  };
  
  return { hasPermission, hasRole, isLoading };
};
