
export interface Document {
  id: string;
  name: string;
  type: "document" | "action" | "precedent" | "strategy";
  size: string;
  updatedAt: Date;
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
  deadline: Date;
  status: string;
  progress?: number;
  responsible?: string;
  priority?: string;
}

export type { CalendarEvent } from "./calendar";
export type { CategoryKey } from "./category";
export type { Task } from "./task";
export { PriorityLevel } from "./priority-level";
export type { FinancialTransaction } from "./financial";
export { TransactionType, TransactionStatus } from "./financial";
export type { User, AuthContextType } from "./auth";
export { UserRole } from "./permissions";
