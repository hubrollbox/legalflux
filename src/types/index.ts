// User related types
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
  assignedToLawyerId?: string; // For assistants, who they're assigned to
}

// Permissions related types
export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  action: string;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
}

// Case related types
export type CaseStatus = "active" | "pending" | "closed" | "archived";
export type CasePriority = "low" | "medium" | "high";

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
  priority: CasePriority;
  description?: string;
}

// Task related types
export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

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
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Document related types
export interface Document {
  id: string;
  name: string;
  caseId?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  size: number;
  type: string;
  url: string;
  version: number;
}

// Message related types
export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  receiverId: string;
  receiverName: string;
  caseId?: string;
  readAt?: string;
  createdAt: string;
}

// Financial related types
export type TransactionType = "invoice" | "payment" | "subscription";
export type TransactionStatus = "pending" | "completed" | "cancelled" | "failed";

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

// Organization related types
export interface Organization {
  id: string;
  name: string;
  memberCount: number;
  createdAt: string;
  address?: string;
  phone?: string;
  email?: string;
}

// Subscription related types
export type SubscriptionPlan = "basic" | "solo" | "enterprise" | "custom";
export type SubscriptionStatus = "active" | "trialing" | "cancelled" | "expired";

export interface Subscription {
  id: string;
  organizationId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  price: number;
  currency: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}
