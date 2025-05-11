
export type UserRole = 'client' | 'admin' | 'lawyer' | 'senior_lawyer' | 'assistant';

export const UserRoles = {
  CLIENT: 'client' as UserRole,
  ADMIN: 'admin' as UserRole,
  LAWYER: 'lawyer' as UserRole,
  SENIOR_LAWYER: 'senior_lawyer' as UserRole,
  ASSISTANT: 'assistant' as UserRole
};

export type UserType = 'particular' | 'professional' | 'company';

export const UserTypes = {
  PARTICULAR: 'particular' as UserType,
  PROFESSIONAL: 'professional' as UserType,
  COMPANY: 'company' as UserType,
  CLIENT: 'particular' as UserType // Alias para compatibilidade
};

export interface User {
  id: string;
  name: string;
  email: string | undefined;
  role?: UserRole;
  avatar?: string;
  organizationId?: string;
  userType?: UserType;
  isActive?: boolean;
  hasTwoFactorEnabled?: boolean;
  createdAt?: string | Date;
  phone?: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface UserPermission {
  userId: string;
  permissionId: string;
  granted: boolean;
  grantedById: string;
  grantedAt: string;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
}
