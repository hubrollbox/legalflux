
export enum UserRole {
  ADMIN = 'Administrador',
  SENIOR_LAWYER = 'Advogado Sênior',
  LAWYER = 'Advogado',
  ASSISTANT = 'Assistente',
  CLIENT = 'Cliente'
}

export enum Permission {
  // Processos
  MANAGE_ALL_PROCESSES = 'manage_all_processes',
  MANAGE_OWN_PROCESSES = 'manage_own_processes',
  VIEW_ALL_PROCESSES = 'view_all_processes',
  VIEW_OWN_PROCESSES = 'view_own_processes',
  
  // Documentos
  MANAGE_ALL_DOCUMENTS = 'manage_all_documents',
  MANAGE_OWN_DOCUMENTS = 'manage_own_documents',
  VIEW_ALL_DOCUMENTS = 'view_all_documents',
  VIEW_OWN_DOCUMENTS = 'view_own_documents',
  
  // Utilizadores
  MANAGE_USERS = 'manage_users',
  MANAGE_PERMISSIONS = 'manage_permissions',
  
  // Financeiro
  MANAGE_BILLING = 'manage_billing',
  VIEW_ALL_BILLING = 'view_all_billing',
  VIEW_OWN_BILLING = 'view_own_billing',
  
  // Configurações
  MANAGE_SYSTEM_SETTINGS = 'manage_system_settings',
  
  // Comunicações
  MANAGE_ALL_COMMUNICATIONS = 'manage_all_communications',
  MANAGE_OWN_COMMUNICATIONS = 'manage_own_communications'
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}

export const DEFAULT_ROLE_PERMISSIONS: RolePermissions[] = [
  {
    role: UserRole.ADMIN,
    permissions: [
      Permission.MANAGE_ALL_PROCESSES,
      Permission.VIEW_ALL_PROCESSES,
      Permission.MANAGE_ALL_DOCUMENTS,
      Permission.VIEW_ALL_DOCUMENTS,
      Permission.MANAGE_USERS,
      Permission.MANAGE_PERMISSIONS,
      Permission.MANAGE_BILLING,
      Permission.VIEW_ALL_BILLING,
      Permission.MANAGE_SYSTEM_SETTINGS,
      Permission.MANAGE_ALL_COMMUNICATIONS
    ]
  },
  {
    role: UserRole.SENIOR_LAWYER,
    permissions: [
      Permission.MANAGE_ALL_PROCESSES,
      Permission.VIEW_ALL_PROCESSES,
      Permission.MANAGE_ALL_DOCUMENTS,
      Permission.VIEW_ALL_DOCUMENTS,
      Permission.MANAGE_BILLING,
      Permission.VIEW_ALL_BILLING,
      Permission.MANAGE_ALL_COMMUNICATIONS
    ]
  },
  {
    role: UserRole.LAWYER,
    permissions: [
      Permission.MANAGE_OWN_PROCESSES,
      Permission.VIEW_OWN_PROCESSES,
      Permission.MANAGE_OWN_DOCUMENTS,
      Permission.VIEW_OWN_DOCUMENTS,
      Permission.VIEW_OWN_BILLING,
      Permission.MANAGE_OWN_COMMUNICATIONS
    ]
  },
  {
    role: UserRole.ASSISTANT,
    permissions: [
      Permission.VIEW_OWN_PROCESSES,
      Permission.MANAGE_OWN_DOCUMENTS,
      Permission.VIEW_OWN_DOCUMENTS,
      Permission.MANAGE_OWN_COMMUNICATIONS
    ]
  },
  {
    role: UserRole.CLIENT,
    permissions: [
      Permission.VIEW_OWN_PROCESSES,
      Permission.VIEW_OWN_DOCUMENTS,
      Permission.VIEW_OWN_BILLING,
      Permission.MANAGE_OWN_COMMUNICATIONS
    ]
  }
];
