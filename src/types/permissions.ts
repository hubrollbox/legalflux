export type Permission = {
  id: string;
  name: string;
  description?: string;
  module?: string; // Added module property
};

export type RolePermission = {
  roleId: string;
  permissionId: string;
  canCreate?: boolean; // Added permissions properties
  canRead?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
};

export type UserPermission = {
  userId: string;
  permissionId: string;
  canCreate?: boolean; // Added permissions properties
  canRead?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
};

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
  SENIOR_LAWYER = 'senior_lawyer', // Added missing roles
  LAWYER = 'lawyer',
  ASSISTANT = 'assistant',
  CLIENT = 'client',
}
