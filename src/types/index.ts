
export interface Document {
  id: string;
  name: string;
  type: "document" | "action" | "precedent" | "strategy";
  size: string;
  updatedAt: string;
  owner: string;
  folder: string;
  process: string;
  tags?: string[];
  status: string;
}

export interface Process {
  id: string;
  title: string;
  clientName: string;
  type: string;
  deadline: string;
  status: string;
  progress?: number;
  responsible?: string;
  priority?: string;
}

export * from "./calendar";
export type { CategoryKey } from "./category";
export * from "./task";
export { PriorityLevel } from "./priority-level";
export type { UserRole as UserRoleEnum } from "./priority-level";
export * from "./financial";
export type { UserRole, UserRoles, UserType, UserTypes } from "./auth";
export * from "./permissions";
export * from "./document";
export * from "./process";
export * from "./plan";

// Re-export types from financial.ts
export type { TransactionType, TransactionStatus, FinancialTransaction } from "./financial";
