
export type UserRole = 'admin' | 'lawyer' | 'senior_lawyer' | 'assistant' | 'client';

export interface Permission {
  id: string;
  name: string;
  description?: string;
  module: string;
  actions: string[];
  createdAt: Date;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  granted: boolean;
}

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['*'],
  lawyer: ['read_cases', 'edit_cases', 'view_documents'],
  senior_lawyer: ['read_cases', 'edit_cases', 'view_documents', 'approve_cases'],
  assistant: ['read_cases', 'view_documents'],
  client: ['read_cases']
};
