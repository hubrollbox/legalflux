
export type UserRole = 'client' | 'lawyer' | 'senior_lawyer' | 'assistant' | 'admin';

export type Permission = 'create' | 'read' | 'update' | 'delete';

export interface UserPermission {
  module: string;
  permissions: Permission[];
}

export interface RolePermissions {
  role: UserRole;
  permissions: UserPermission[];
}
