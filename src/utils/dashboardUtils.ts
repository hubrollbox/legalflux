
import { UserRole } from "../hooks/useAuth";
import { PriorityLevel } from "../types/priority-level";

export const getDefaultPermissions = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return {
        canCreateCase: true,
        canEditCase: true,
        canDeleteCase: true,
        canAssignCase: true,
        canViewAllCases: true,
        canViewReports: true,
        canManageUsers: true,
        canAccessBilling: true,
      };
    case UserRole.SENIOR_LAWYER:
      return {
        canCreateCase: true,
        canEditCase: true,
        canDeleteCase: false,
        canAssignCase: true,
        canViewAllCases: true,
        canViewReports: true,
        canManageUsers: false,
        canAccessBilling: true,
      };
    case UserRole.LAWYER:
      return {
        canCreateCase: true,
        canEditCase: true,
        canDeleteCase: false,
        canAssignCase: false,
        canViewAllCases: false,
        canViewReports: false,
        canManageUsers: false,
        canAccessBilling: false,
      };
    case UserRole.ASSISTANT:
      return {
        canCreateCase: false,
        canEditCase: true,
        canDeleteCase: false,
        canAssignCase: false,
        canViewAllCases: false,
        canViewReports: false,
        canManageUsers: false,
        canAccessBilling: false,
      };
    case UserRole.CLIENT:
      return {
        canCreateCase: false,
        canEditCase: false,
        canDeleteCase: false,
        canAssignCase: false,
        canViewAllCases: false,
        canViewReports: false,
        canManageUsers: false,
        canAccessBilling: false,
      };
    default:
      return {
        canCreateCase: false,
        canEditCase: false,
        canDeleteCase: false,
        canAssignCase: false,
        canViewAllCases: false,
        canViewReports: false,
        canManageUsers: false,
        canAccessBilling: false,
      };
  }
};

export const getPriorityColor = (priority: PriorityLevel) => {
  switch (priority) {
    case PriorityLevel.HIGH:
      return 'bg-red-100 text-red-800';
    case PriorityLevel.MEDIUM:
      return 'bg-yellow-100 text-yellow-800';
    case PriorityLevel.LOW:
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function getUserRoleName(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return "Administrator";
    case UserRole.SENIOR_LAWYER:
      return "Senior Lawyer";
    case UserRole.LAWYER:
      return "Lawyer";
    case UserRole.ASSISTANT:
      return "Assistant";
    case UserRole.CLIENT:
      return "Client";
    default:
      return "User";
  }
}
