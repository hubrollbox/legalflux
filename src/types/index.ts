
// Authentication types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
  profileImage?: string;
}

export enum UserRole {
  CLIENT = 'client',
  LAWYER = 'lawyer',
  SENIOR_LAWYER = 'senior_lawyer',
  ASSISTANT = 'assistant',
  ADMIN = 'admin'
}

// Case management types
export interface Case {
  id: string;
  title: string;
  description?: string;
  status: CaseStatus;
  priority: PriorityLevel;
  clientId: string;
  assignedLawyerId: string;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  category?: string;
  documents?: Document[];
  notes?: Note[];
}

export enum CaseStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  WAITING = 'waiting',
  CLOSED = 'closed'
}

export enum PriorityLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

// Task management types
export interface Task {
  id: string;
  title: string;
  description?: string;
  caseId?: string;
  assignedToId: string;
  createdById: string;
  status: TaskStatus;
  priority: PriorityLevel;
  dueDate: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  REVIEW = 'review',
  DONE = 'done'
}

// Document types
export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  caseId?: string;
  uploaderId: string;
  createdAt: string;
  updatedAt: string;
}

// Note types
export interface Note {
  id: string;
  content: string;
  caseId?: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

// Financial types
export interface FinancialTransaction {
  id: string;
  amount: number;
  type: 'invoice' | 'payment' | 'expense';
  status: 'pending' | 'completed' | 'cancelled';
  caseId?: string;
  clientId?: string;
  description?: string;
  createdAt: string;
  dueDate?: string;
  completedAt?: string;
}

// Client types
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  taxId?: string;
  type: 'individual' | 'company';
  createdAt: string;
  updatedAt: string;
}

// Subscription types
export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: string;
  endDate: string;
  renewalDate?: string;
  paymentMethod?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number | null;
  description: string;
  features: string[];
  maxUsers?: number;
  maxStorage?: number;
  maxCases?: number;
}
