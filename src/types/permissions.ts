
export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
  LAWYER = 'lawyer',
  SENIOR_LAWYER = 'senior_lawyer',
  ASSISTANT = 'assistant'
}

export const DEFAULT_PERMISSIONS = {
  [UserRole.ADMIN]: [
    'view_all_processes',
    'create_process',
    'edit_process',
    'delete_process',
    'manage_users',
    'manage_permissions',
    'view_analytics',
    'financial_management',
  ],
  [UserRole.LAWYER]: [
    'view_assigned_processes',
    'create_process',
    'edit_assigned_process',
    'client_communication',
    'document_management',
  ],
  [UserRole.SENIOR_LAWYER]: [
    'view_all_processes',
    'create_process',
    'edit_process',
    'client_communication',
    'document_management',
    'team_management',
    'view_analytics',
  ],
  [UserRole.ASSISTANT]: [
    'view_assigned_processes',
    'document_management',
    'calendar_management',
  ],
  [UserRole.CLIENT]: [
    'view_own_processes',
    'view_own_documents',
    'client_communication',
  ],
};
