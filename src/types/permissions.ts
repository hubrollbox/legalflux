
import { UserRole } from './auth';

// Export UserRole to fix imports in other files
export { UserRole } from './auth';

// Interface para permissões extendida para atender UserPermissionsDialog
export interface Permission {
  id: string;
  resource: string;
  action: string;
  name: string;
  description: string;
  module: string;
}

// Mapeamento básico de permissões por função de usuário
export const DEFAULT_PERMISSIONS: Record<UserRole, string[]> = {
  client: [
    "view_own_documents",
    "view_own_processes",
    "view_own_financial",
    "communicate_with_lawyer",
  ],
  lawyer: [
    "manage_processes",
    "manage_documents",
    "view_financial",
    "communicate_with_client",
    "manage_tasks",
  ],
  senior_lawyer: [
    "manage_processes",
    "manage_documents",
    "manage_financial",
    "communicate_with_client",
    "manage_tasks",
    "manage_team",
    "view_analytics",
  ],
  assistant: [
    "view_processes",
    "manage_documents",
    "manage_tasks",
    "communicate_with_client",
  ],
  admin: ["*"], // Acesso total
};

// Export UserRoles for components that need it
export { UserRoles } from './auth';
