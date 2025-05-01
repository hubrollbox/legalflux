
export enum UserRole {
  CLIENT = 'client',
  LAWYER = 'lawyer',
  SENIOR_LAWYER = 'senior_lawyer',
  ASSISTANT = 'assistant',
  ADMIN = 'admin'
}

export type Permission = {
  module: string;
  action: 'create' | 'read' | 'update' | 'delete';
};

export type RolePermission = {
  role: UserRole;
  permissions: Permission[];
};
