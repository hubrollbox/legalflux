
export type UserRole = "admin" | "lawyer" | "senior_lawyer" | "assistant" | "client";

export type Permission = "view" | "create" | "edit" | "delete" | {
  id: string;
  resource: string;
  action: string;
  name: string;
  description: string;
  module: string;
};

export type PermissionArea =
  | "dashboard"
  | "processes"
  | "calendar"
  | "documents"
  | "financial"
  | "users"
  | "settings"
  | "reports";

export interface UserPermissions {
  [key: string]: Permission[];
}

// Define constantes para UserRole para uso em lugar de enums
export const UserRoles = {
  ADMIN: "admin" as UserRole,
  LAWYER: "lawyer" as UserRole,
  SENIOR_LAWYER: "senior_lawyer" as UserRole,
  ASSISTANT: "assistant" as UserRole,
  CLIENT: "client" as UserRole
};

export const defaultPermissions: Record<UserRole, UserPermissions> = {
  admin: {
    dashboard: ["view"],
    processes: ["view", "create", "edit", "delete"],
    calendar: ["view", "create", "edit", "delete"],
    documents: ["view", "create", "edit", "delete"],
    financial: ["view", "create", "edit", "delete"],
    users: ["view", "create", "edit", "delete"],
    settings: ["view", "edit"],
    reports: ["view", "create"],
  },
  lawyer: {
    dashboard: ["view"],
    processes: ["view", "create", "edit"],
    calendar: ["view", "create", "edit"],
    documents: ["view", "create", "edit"],
    financial: ["view"],
    users: ["view"],
    settings: [],
    reports: ["view"],
  },
  senior_lawyer: {
    dashboard: ["view"],
    processes: ["view", "create", "edit", "delete"],
    calendar: ["view", "create", "edit", "delete"],
    documents: ["view", "create", "edit", "delete"],
    financial: ["view", "create"],
    users: ["view", "create", "edit"],
    settings: ["view"],
    reports: ["view", "create"],
  },
  assistant: {
    dashboard: ["view"],
    processes: ["view", "edit"],
    calendar: ["view", "create", "edit"],
    documents: ["view", "create", "edit"],
    financial: [],
    users: [],
    settings: [],
    reports: [],
  },
  client: {
    dashboard: ["view"],
    processes: ["view"],
    calendar: ["view"],
    documents: ["view"],
    financial: ["view"],
    users: [],
    settings: [],
    reports: [],
  },
};
