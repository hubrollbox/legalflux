
export type UserRole = 'client' | 'admin' | 'lawyer' | 'senior_lawyer' | 'assistant';

export const UserRoles = {
  CLIENT: 'client' as UserRole,
  ADMIN: 'admin' as UserRole,
  LAWYER: 'lawyer' as UserRole,
  SENIOR_LAWYER: 'senior_lawyer' as UserRole,
  ASSISTANT: 'assistant' as UserRole
};

export const DEFAULT_PERMISSIONS = {
  [UserRoles.ADMIN]: [
    'view_all_processes',
    'create_process',
    'edit_process',
    'delete_process',
    'manage_users',
    'manage_permissions',
    'view_analytics',
    'financial_management',
  ],
  [UserRoles.LAWYER]: [
    'view_assigned_processes',
    'create_process',
    'edit_assigned_process',
    'client_communication',
    'document_management',
  ],
  [UserRoles.SENIOR_LAWYER]: [
    'view_all_processes',
    'create_process',
    'edit_process',
    'client_communication',
    'document_management',
    'team_management',
    'view_analytics',
  ],
  [UserRoles.ASSISTANT]: [
    'view_assigned_processes',
    'document_management',
    'calendar_management',
  ],
  [UserRoles.CLIENT]: [
    'view_own_processes',
    'view_own_documents',
    'client_communication',
  ],
};

export type UserType = 'particular' | 'professional' | 'company';

export const UserTypes = {
  PARTICULAR: 'particular' as UserType,
  PROFESSIONAL: 'professional' as UserType,
  COMPANY: 'company' as UserType,
  CLIENT: 'particular' as UserType // Alias para compatibilidade
};


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

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  hasTwoFactorEnabled: boolean;
  phone?: string;
  organizationId?: string;
  lastLogin?: string;
  avatar?: string;
}

export interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense' | 'invoice' | 'payment';
  amount: number;
  currency: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled' | 'failed';
  category: string;
  processId?: string;
  clientId?: string;
}
