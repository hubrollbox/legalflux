
// User roles
export type UserRole = "admin" | "lawyer" | "senior_lawyer" | "assistant" | "client";

// User types
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
  avatar?: string; // Adding the avatar property as optional
}

// Permission related types
export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  action: "read" | "create" | "update" | "delete";
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
}

// Case status
export type CaseStatus = "active" | "pending" | "closed" | "archived";

// Priority types
export type PriorityLevel = "low" | "medium" | "high";

// Case types
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

// Task status
export type TaskStatus = "todo" | "in_progress" | "done" | "blocked";

// Task types
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

// Document types
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

// Message types
export interface Message {
  id: string;
  type?: 'text' | 'system' | 'warning';
  content: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  receiverId: string;
  receiverName: string;
  caseId?: string;
  readAt?: string;
  createdAt: string;
}

// Financial transaction types
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

// Organization types
export interface Organization {
  id: string;
  name: string;
  memberCount: number;
  createdAt: string;
  address?: string;
  phone?: string;
  email?: string;
}

// Subscription types
export type SubscriptionPlan = "basic" | "solo" | "enterprise" | "custom";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing";

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
