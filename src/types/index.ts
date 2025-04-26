export type CategoryKey = 'meeting' | 'deadline' | 'task' | 'other' | 'reminder' | 'document';

export type AnyObject = object;

export interface CategoryConfig {
  label: string;
  color: string;
  icon: React.ComponentType;
}

export interface Case {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  assignedLawyerId: string;
  assignedLawyerName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  priority: string;
  description: string;
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  INVOICE = 'invoice',
  PAYMENT = 'payment',
  REFUND = 'refund',
  OTHER = 'other'
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'deadline' | 'reminder' | 'alert' | 'process' | 'action' | 'message' | 'info';
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  description?: string;
  userId?: string;
  data?: Record<string, any>;
  recipients?: string[];
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export interface FinancialTransaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  date: string;
  status: string;
  clientId?: string;
  caseId?: string;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  BLOCKED = 'blocked'
}

export enum PriorityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  priority: string;
  assignedTo: string;
  assignedToId?: string; // Added to match usage in AdvancedAnalytics.tsx
  caseId?: string;
  type?: string;
}

export type { User } from './auth';
export { UserRole } from './permissions';



export interface Document {
  id: string;
  name: string;
  title: string;
  description?: string;
  url: string;
  fileUrl?: string;
  type: 'document' | 'action' | 'precedent' | 'strategy';
  size?: number;
  createdAt: string;
  updatedAt?: string;
  version?: number;
  clientId: string;
  processId: string;
  caseId?: string;
  status?: string;
  uploadDate?: string;
  processNumber?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type?: string;
  attachments?: string[];
  caseId?: string;
  role?: 'user' | 'assistant' | 'system';
  sender?: string;
  senderInitials?: string;
  senderAvatar?: string;
  isFromUser?: boolean;
}

export interface Organization {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  logo?: string;
  createdAt: string;
  updatedAt?: string;
  status: string;
  planId?: string;
}

export interface Subscription {
  id: string;
  organizationId: string;
  planId: string;
  planName: string;
  status: string;
  startDate: string;
  endDate: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features?: string[];
  paymentMethod?: string;
}



export interface NotificationPreference {
  deadlines: boolean;
  messages: boolean;
  processes: boolean;
  sound: boolean;
  priority: {
    high: boolean;
    medium: boolean;
    low: boolean;
  };
  deliveryMethod?: 'none' | 'email' | 'push'; // Add this line if needed
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  usageCount: number;
  documentType: string;
  tags?: string[];
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: number;
  fileUrl: string;
  changes: string;
  createdAt: string;
  createdBy: string;
  clientId: string;
  processId: string;
}

export interface TextCorrection {
  original: string;
  suggested: string;
  reason: string;
}

export interface ClauseSuggestion {
  title: string;
  content: string;
  reason: string;
}

export interface DocumentAnalysisResult {
  corrections: TextCorrection[];
  suggestions: ClauseSuggestion[];
  completeness: number;
  riskScore: number;
  riskAreas: {
    title: string;
    description: string;
    severity: 'high' | 'medium' | 'low';
  }[];
  missingClauses: {
    title: string;
    description: string;
    importance: 'essential' | 'recommended' | 'optional';
  }[];
}
