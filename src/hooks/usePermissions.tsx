
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/permissions';

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
        
        switch (user.role) {
          case UserRole.ADMIN:
            // Admin has all permissions
            permissionMap.users = true;
            permissionMap.clients = true;
            permissionMap.processes = true;
            permissionMap.documents = true;
            permissionMap.calendar = true;
            permissionMap.financial = true;
            permissionMap.settings = true;
            permissionMap.reports = true;
            break;
            
          case UserRole.SENIOR_LAWYER:
            // Senior lawyer has most permissions
            permissionMap.clients = true;
            permissionMap.processes = true;
            permissionMap.documents = true;
            permissionMap.calendar = true;
            permissionMap.financial = true;
            permissionMap.reports = true;
            break;
            
          case UserRole.LAWYER:
            // Regular lawyer
            permissionMap.clients = true;
            permissionMap.processes = true;
            permissionMap.documents = true;
            permissionMap.calendar = true;
            break;
            
          case UserRole.ASSISTANT:
            // Assistant has limited permissions
            permissionMap.calendar = true;
            permissionMap.documents = true;
            break;
            
          case UserRole.CLIENT:
            // Client has very limited access
            permissionMap.clientDocuments = true;
            permissionMap.clientProcesses = true;
            permissionMap.clientCalendar = true;
            break;
            
          default:
            // No permissions by default
            break;
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

  const hasPermission = (module: string): boolean => {
    return !!permissions[module];
  };

  return {
    permissions,
    hasPermission,
    isLoading
  };
}
