
export enum UserRole {
  CLIENT = 'client',
  LAWYER = 'lawyer',
  SENIOR_LAWYER = 'senior_lawyer',
  ASSISTANT = 'assistant',
  ADMIN = 'ADMIN'
}

export interface Permission {
  id: string;
  resource: string;
  action: string;
  name: string;
  description: string;
  module: string;
}

export interface RolePermissions {
  [key: string]: string[];
}

export interface PermissionCheck {
  resource: string;
  action: string;
}
