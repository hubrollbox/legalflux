
export enum UserRole {
  CLIENT = 'client',
  LAWYER = 'lawyer',
  SENIOR_LAWYER = 'senior_lawyer',
  ASSISTANT = 'assistant',
  ADMIN = 'admin'
}

export interface Permission {
  module: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface UserPermissions {
  userId: string;
  role: UserRole;
  permissions: Permission[];
}
