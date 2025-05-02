
export type Permission = 
  | "VIEW_DASHBOARD" 
  | "VIEW_CLIENTS" 
  | "MANAGE_CLIENTS" 
  | "VIEW_PROCESSES" 
  | "MANAGE_PROCESSES" 
  | "VIEW_DOCUMENTS" 
  | "MANAGE_DOCUMENTS" 
  | "VIEW_CALENDAR" 
  | "MANAGE_CALENDAR" 
  | "VIEW_TASKS" 
  | "MANAGE_TASKS" 
  | "VIEW_FINANCIAL" 
  | "MANAGE_FINANCIAL" 
  | "VIEW_ANALYTICS" 
  | "MANAGE_ANALYTICS" 
  | "VIEW_USERS" 
  | "MANAGE_USERS" 
  | "MANAGE_ROLES" 
  | "MANAGE_SETTINGS" 
  | "ADMIN_ACCESS";

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
}

export interface PermissionGroup {
  name: string;
  permissions: Permission[];
}

export const PERMISSION_GROUPS: PermissionGroup[] = [
  {
    name: "Dashboard",
    permissions: ["VIEW_DASHBOARD"]
  },
  {
    name: "Clientes",
    permissions: ["VIEW_CLIENTS", "MANAGE_CLIENTS"]
  },
  {
    name: "Processos",
    permissions: ["VIEW_PROCESSES", "MANAGE_PROCESSES"]
  },
  {
    name: "Documentos",
    permissions: ["VIEW_DOCUMENTS", "MANAGE_DOCUMENTS"]
  },
  {
    name: "Calendário",
    permissions: ["VIEW_CALENDAR", "MANAGE_CALENDAR"]
  },
  {
    name: "Tarefas",
    permissions: ["VIEW_TASKS", "MANAGE_TASKS"]
  },
  {
    name: "Financeiro",
    permissions: ["VIEW_FINANCIAL", "MANAGE_FINANCIAL"]
  },
  {
    name: "Análise",
    permissions: ["VIEW_ANALYTICS", "MANAGE_ANALYTICS"]
  },
  {
    name: "Utilizadores",
    permissions: ["VIEW_USERS", "MANAGE_USERS", "MANAGE_ROLES"]
  },
  {
    name: "Sistema",
    permissions: ["MANAGE_SETTINGS", "ADMIN_ACCESS"]
  }
];

export const DEFAULT_ROLE_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    "VIEW_DASHBOARD", "VIEW_CLIENTS", "MANAGE_CLIENTS", "VIEW_PROCESSES", 
    "MANAGE_PROCESSES", "VIEW_DOCUMENTS", "MANAGE_DOCUMENTS", "VIEW_CALENDAR", 
    "MANAGE_CALENDAR", "VIEW_TASKS", "MANAGE_TASKS", "VIEW_FINANCIAL", 
    "MANAGE_FINANCIAL", "VIEW_ANALYTICS", "MANAGE_ANALYTICS", "VIEW_USERS", 
    "MANAGE_USERS", "MANAGE_ROLES", "MANAGE_SETTINGS", "ADMIN_ACCESS"
  ],
  lawyer: [
    "VIEW_DASHBOARD", "VIEW_CLIENTS", "MANAGE_CLIENTS", "VIEW_PROCESSES", 
    "MANAGE_PROCESSES", "VIEW_DOCUMENTS", "MANAGE_DOCUMENTS", "VIEW_CALENDAR", 
    "MANAGE_CALENDAR", "VIEW_TASKS", "MANAGE_TASKS", "VIEW_FINANCIAL"
  ],
  senior_lawyer: [
    "VIEW_DASHBOARD", "VIEW_CLIENTS", "MANAGE_CLIENTS", "VIEW_PROCESSES", 
    "MANAGE_PROCESSES", "VIEW_DOCUMENTS", "MANAGE_DOCUMENTS", "VIEW_CALENDAR", 
    "MANAGE_CALENDAR", "VIEW_TASKS", "MANAGE_TASKS", "VIEW_FINANCIAL",
    "MANAGE_FINANCIAL", "VIEW_ANALYTICS", "VIEW_USERS"
  ],
  assistant: [
    "VIEW_DASHBOARD", "VIEW_CLIENTS", "VIEW_PROCESSES", "VIEW_DOCUMENTS", 
    "MANAGE_DOCUMENTS", "VIEW_CALENDAR", "MANAGE_CALENDAR", "VIEW_TASKS", "MANAGE_TASKS"
  ],
  client: [
    "VIEW_DASHBOARD", "VIEW_PROCESSES", "VIEW_DOCUMENTS", "VIEW_CALENDAR", 
    "VIEW_TASKS", "VIEW_FINANCIAL"
  ]
};
