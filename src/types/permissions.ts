
import { UserRole } from './auth';

export { UserRole };

export const DEFAULT_PERMISSIONS: Record<UserRole, string[]> = {
  client: [
    'processes.view_own',
    'documents.view_own',
    'documents.download_own',
    'profile.edit_own',
  ],
  lawyer: [
    'processes.view_own',
    'processes.create',
    'processes.edit_own',
    'documents.view_own',
    'documents.create',
    'documents.edit_own',
    'documents.download_own',
    'clients.view_own',
    'clients.create',
    'profile.edit_own',
  ],
  senior_lawyer: [
    'processes.view_all',
    'processes.create',
    'processes.edit_all',
    'documents.view_all',
    'documents.create',
    'documents.edit_all',
    'documents.download_all',
    'clients.view_all',
    'clients.create',
    'clients.edit_all',
    'team.view',
    'team.assign',
    'profile.edit_own',
  ],
  assistant: [
    'processes.view_assigned',
    'documents.view_assigned',
    'documents.create',
    'documents.edit_assigned',
    'documents.download_assigned',
    'profile.edit_own',
  ],
  admin: [
    '*', // Admin has all permissions
  ],
};

export interface Permission {
  id: string;
  name: string;
  description: string;
}
