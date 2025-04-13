
export type UserRole = "admin" | "lawyer" | "senior_lawyer" | "assistant" | "client";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
  hasTwoFactorEnabled: boolean;
  organizationId?: string;
  phone?: string;
  assignedToLawyerId?: string;
  avatar?: string;
}

export type CategoryKey = 'meeting' | 'deadline' | 'task' | 'other';
export type PriorityLevel = 'high' | 'medium' | 'low';

export type CaseStatus = "active" | "pending" | "closed" | "archived";

export interface Case {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  assignedLawyerId: string;
  assignedLawyerName: string;
  status: CaseStatus;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  priority: PriorityLevel;
  description?: string;
}

export type TaskStatus = "todo" | "in_progress" | "done" | "blocked";

export interface Task {
  id: string;
  title: string;
  description?: string;
  caseId: string;
  caseName: string;
  assignedToId: string;
  assignedToName: string;
  assignedById: string;
  assignedByName: string;
  status: TaskStatus;
  priority: PriorityLevel;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  category: CategoryKey;
  priority?: PriorityLevel;
  description?: string;
}

export type TaskStatus = "todo" | "in_progress" | "done" | "blocked";

export interface Task {
  id: string;
  title: string;
  description?: string;
  caseId: string;
  caseName: string;
  assignedToId: string;
  assignedToName: string;
  assignedById: string;
  assignedByName: string;
  status: TaskStatus;
  priority: PriorityLevel;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionType = "invoice" | "payment" | "refund" | "subscription";
export type TransactionStatus = "pending" | "completed" | "failed" | "canceled";

export interface FinancialTransaction {
  id: string;
  clientId?: string;
  clientName?: string;
  caseId?: string;
  caseName?: string;
  amount: number;
  currency: string;
  type: TransactionType;
  status: TransactionStatus;
  date: string;
  description?: string;
}

export type TaskStatus = "todo" | "in_progress" | "done" | "blocked";

export interface Task {
  id: string;
  title: string;
  description?: string;
  caseId: string;
  caseName: string;
  assignedToId: string;
  assignedToName: string;
  assignedById: string;
  assignedByName: string;
  status: TaskStatus;
  priority: PriorityLevel;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
