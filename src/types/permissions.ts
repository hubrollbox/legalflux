
export enum UserRole {
  CLIENT = 'client',
  LAWYER = 'lawyer',
  SENIOR_LAWYER = 'senior_lawyer',
  ASSISTANT = 'assistant',
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

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
