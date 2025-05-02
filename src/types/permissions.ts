
/**
 * Defines the roles available in the system
 */
export enum UserRole {
  ADMIN = 'admin',
  SENIOR_LAWYER = 'senior_lawyer',
  LAWYER = 'lawyer',
  ASSISTANT = 'assistant',
  CLIENT = 'client',
}

/**
 * Defines permissions for each user role
 */
export interface UserPermissions {
  canCreateCase: boolean;
  canEditCase: boolean;
  canDeleteCase: boolean;
  canAssignCase: boolean;
  canViewAllCases: boolean;
  canViewReports: boolean;
  canManageUsers: boolean;
  canAccessBilling: boolean;
}

/**
 * Maps roles to their default permissions
 */
export const defaultPermissionsByRole: Record<UserRole, UserPermissions> = {
  [UserRole.ADMIN]: {
    canCreateCase: true,
    canEditCase: true,
    canDeleteCase: true,
    canAssignCase: true,
    canViewAllCases: true,
    canViewReports: true,
    canManageUsers: true,
    canAccessBilling: true,
  },
  [UserRole.SENIOR_LAWYER]: {
    canCreateCase: true,
    canEditCase: true,
    canDeleteCase: false,
    canAssignCase: true,
    canViewAllCases: true,
    canViewReports: true,
    canManageUsers: false,
    canAccessBilling: true,
  },
  [UserRole.LAWYER]: {
    canCreateCase: true,
    canEditCase: true,
    canDeleteCase: false,
    canAssignCase: false,
    canViewAllCases: false,
    canViewReports: false,
    canManageUsers: false,
    canAccessBilling: false,
  },
  [UserRole.ASSISTANT]: {
    canCreateCase: false,
    canEditCase: true,
    canDeleteCase: false,
    canAssignCase: false,
    canViewAllCases: false,
    canViewReports: false,
    canManageUsers: false,
    canAccessBilling: false,
  },
  [UserRole.CLIENT]: {
    canCreateCase: false,
    canEditCase: false,
    canDeleteCase: false,
    canAssignCase: false,
    canViewAllCases: false,
    canViewReports: false,
    canManageUsers: false,
    canAccessBilling: false,
  },
};
