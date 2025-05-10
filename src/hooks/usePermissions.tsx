
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth';
import { DEFAULT_PERMISSIONS } from '@/types/permissions';

type PermissionMap = Record<string, boolean>;

export function usePermissions() {
  const { user, isAuthenticated } = useAuth();
  const [permissions, setPermissions] = useState<PermissionMap>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPermissions = async () => {
      setIsLoading(true);
      
      try {
        // This is a simplified example. In a real application, you would fetch
        // permissions from your backend/database
        
        if (!isAuthenticated || !user) {
          setPermissions({});
          return;
        }
        
        // Define permissions based on user role
        const permissionMap: PermissionMap = {};
        
        if (user.role) {
          const userPerms = DEFAULT_PERMISSIONS[user.role as UserRole] || [];
          
          // Convert permissions array to a map for easy checking
          userPerms.forEach(perm => {
            permissionMap[perm] = true;
          });
        }
        
        setPermissions(permissionMap);
      } catch (error) {
        console.error('Error loading permissions:', error);
        setPermissions({});
      } finally {
        setIsLoading(false);
      }
    };

    loadPermissions();
  }, [user, isAuthenticated]);

  const hasPermission = useCallback((permission: string): boolean => {
    // Admin has all permissions
    if (user?.role === 'admin') return true;
    
    // Check if user has explicit permission
    return !!permissions[permission];
  }, [user, permissions]);
  
  const hasRole = useCallback((role: UserRole): boolean => {
    return user?.role === role;
  }, [user]);

  return {
    permissions,
    hasPermission,
    hasRole,
    isLoading
  };
}

export default usePermissions;
