
export enum UserRole {
  CLIENT = "client",
  LAWYER = "lawyer",
  ADMIN = "admin",
  ASSISTANT = "assistant",
  SENIOR_LAWYER = "senior_lawyer"
}

export type Permission = 
  | "READ_CLIENTS"
  | "WRITE_CLIENTS"
  | "READ_PROCESSES"
  | "WRITE_PROCESSES"
  | "READ_CALENDAR"
  | "WRITE_CALENDAR"
  | "READ_INVOICES"
  | "WRITE_INVOICES"
  | "READ_REPORTS"
  | "WRITE_REPORTS"
  | "ADMIN_ACCESS"
  | string;

export const DEFAULT_ROLE_PERMISSIONS: Record<string, Permission[]> = {
  [UserRole.CLIENT]: [
    "READ_PROCESSES",
    "READ_CALENDAR",
    "READ_INVOICES"
  ],
  [UserRole.LAWYER]: [
    "READ_CLIENTS",
    "READ_PROCESSES",
    "WRITE_PROCESSES",
    "READ_CALENDAR",
    "WRITE_CALENDAR",
    "READ_INVOICES"
  ],
  [UserRole.ASSISTANT]: [
    "READ_CLIENTS",
    "READ_PROCESSES",
    "READ_CALENDAR",
    "WRITE_CALENDAR",
    "READ_INVOICES"
  ],
  [UserRole.SENIOR_LAWYER]: [
    "READ_CLIENTS",
    "WRITE_CLIENTS",
    "READ_PROCESSES",
    "WRITE_PROCESSES",
    "READ_CALENDAR",
    "WRITE_CALENDAR",
    "READ_INVOICES",
    "WRITE_INVOICES",
    "READ_REPORTS"
  ],
  [UserRole.ADMIN]: [
    "ADMIN_ACCESS"
  ]
};
