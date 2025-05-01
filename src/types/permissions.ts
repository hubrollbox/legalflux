
export type UserRole = 'client' | 'lawyer' | 'senior_lawyer' | 'assistant' | 'admin';

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}
