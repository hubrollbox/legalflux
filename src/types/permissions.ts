
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
