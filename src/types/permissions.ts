
export type UserRole = "admin" | "lawyer" | "senior_lawyer" | "assistant" | "client";

export type Permission = "view" | "create" | "edit" | "delete";

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
