
import React, { createContext, useContext, useMemo } from 'react';
import { useAuth, UserRole } from './useAuth';

// Define permission types
export enum Permission {
  // User management
  ViewUsers = 'view_users',
  CreateUser = 'create_user',
  EditUser = 'edit_user',
  DeleteUser = 'delete_user',
  
  // Process management
  ViewAllProcesses = 'view_all_processes',
  ViewOwnProcesses = 'view_own_processes',
  CreateProcess = 'create_process',
  EditProcess = 'edit_process',
  DeleteProcess = 'delete_process',
  AssignProcess = 'assign_process',
  
  // Document management
  ViewAllDocuments = 'view_all_documents',
  ViewOwnDocuments = 'view_own_documents',
  CreateDocument = 'create_document',
  EditDocument = 'edit_document',
  DeleteDocument = 'delete_document',
  
  // Financial
  ViewFinancials = 'view_financials',
  ManageBilling = 'manage_billing',
  
  // Settings
  ManageSettings = 'manage_settings',
}

type UserPermissions = Record<Permission, boolean>;

interface PermissionsContextType {
  hasPermission: (permission: Permission) => boolean;
  userPermissions: UserPermissions;
}

const PermissionsContext = createContext<PermissionsContextType>({
  hasPermission: () => false,
  userPermissions: {} as UserPermissions,
});

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const { user } = useAuth();

  const userPermissions = useMemo(() => {
    const allPermissions = Object.values(Permission).reduce(
      (acc, permission) => ({ ...acc, [permission]: false }),
      {} as UserPermissions
    );

    if (!user) return allPermissions;

    // Define role-based permissions
    const rolePermissions: Record<UserRole, Permission[]> = {
      admin: Object.values(Permission), // Admins have all permissions
      
      senior_lawyer: [
        Permission.ViewAllProcesses,
        Permission.ViewOwnProcesses,
        Permission.CreateProcess,
        Permission.EditProcess,
        Permission.DeleteProcess,
        Permission.AssignProcess,
        Permission.ViewAllDocuments,
        Permission.ViewOwnDocuments,
        Permission.CreateDocument,
        Permission.EditDocument,
        Permission.DeleteDocument,
        Permission.ViewFinancials,
        Permission.ManageBilling,
      ],
      
      lawyer: [
        Permission.ViewOwnProcesses,
        Permission.CreateProcess,
        Permission.EditProcess,
        Permission.ViewOwnDocuments,
        Permission.CreateDocument,
        Permission.EditDocument,
      ],
      
      assistant: [
        Permission.ViewOwnProcesses,
        Permission.ViewOwnDocuments,
        Permission.CreateDocument,
      ],
      
      client: [
        Permission.ViewOwnProcesses,
        Permission.ViewOwnDocuments,
      ],
    };

    // Assign permissions based on user role
    const permissionsForRole = rolePermissions[user.role] || [];
    
    return {
      ...allPermissions,
      ...permissionsForRole.reduce(
        (acc, permission) => ({ ...acc, [permission]: true }),
        {} as UserPermissions
      ),
    };
  }, [user]);

  const hasPermission = (permission: Permission): boolean => {
    return !!userPermissions[permission];
  };

  return (
    <PermissionsContext.Provider value={{ hasPermission, userPermissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);
