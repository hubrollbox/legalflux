
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

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.CLIENT]: [
    { module: 'documents', create: false, read: true, update: false, delete: false },
    { module: 'profile', create: false, read: true, update: true, delete: false }
  ],
  [UserRole.LAWYER]: [
    { module: 'documents', create: true, read: true, update: true, delete: false },
    { module: 'clients', create: true, read: true, update: true, delete: false },
    { module: 'profile', create: false, read: true, update: true, delete: false }
  ],
  [UserRole.SENIOR_LAWYER]: [
    { module: 'documents', create: true, read: true, update: true, delete: true },
    { module: 'clients', create: true, read: true, update: true, delete: true },
    { module: 'profile', create: false, read: true, update: true, delete: false }
  ],
  [UserRole.ASSISTANT]: [
    { module: 'documents', create: true, read: true, update: false, delete: false },
    { module: 'clients', create: false, read: true, update: false, delete: false },
    { module: 'profile', create: false, read: true, update: false, delete: false }
  ],
  [UserRole.ADMIN]: [
    { module: 'documents', create: true, read: true, update: true, delete: true },
    { module: 'clients', create: true, read: true, update: true, delete: true },
    { module: 'profile', create: true, read: true, update: true, delete: true }
  ]
};
