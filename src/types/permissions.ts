
export enum UserRole {
  ADMIN = "ADMIN",
  LAWYER = "LAWYER",
  SENIOR_LAWYER = "SENIOR_LAWYER",
  ASSISTANT = "ASSISTANT",
  CLIENT = "CLIENT"
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatar?: string;
  phone?: string;
  organizationId?: string;
  lastLogin?: string;
  createdAt?: string;
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
