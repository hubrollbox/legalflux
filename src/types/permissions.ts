
export enum UserRole {
  CLIENT = "client",
  LAWYER = "lawyer",
  SENIOR_LAWYER = "senior_lawyer",
  ASSISTANT = "assistant",
  ADMIN = "admin"
}

export type Permission =
  | "view_dashboard"
  | "manage_clients"
  | "manage_processes"
  | "manage_documents"
  | "manage_calendar"
  | "manage_team"
  | "manage_financial"
  | "admin_access";

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.CLIENT]: ["view_dashboard"],
  [UserRole.LAWYER]: [
    "view_dashboard",
    "manage_clients",
    "manage_processes",
    "manage_documents",
    "manage_calendar"
  ],
  [UserRole.SENIOR_LAWYER]: [
    "view_dashboard",
    "manage_clients",
    "manage_processes",
    "manage_documents",
    "manage_calendar",
    "manage_team"
  ],
  [UserRole.ASSISTANT]: [
    "view_dashboard",
    "manage_documents",
    "manage_calendar"
  ],
  [UserRole.ADMIN]: [
    "view_dashboard",
    "manage_clients",
    "manage_processes",
    "manage_documents",
    "manage_calendar",
    "manage_team",
    "manage_financial",
    "admin_access"
  ]
};
