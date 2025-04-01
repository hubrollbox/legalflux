
export type UserRole = 'client' | 'lawyer' | 'senior_lawyer' | 'assistant' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  subscriptionId?: string;
  organizationId?: string;
  phone?: string;
  hasTwoFactorEnabled: boolean;
}

export interface Organization {
  id: string;
  name: string;
  plan: SubscriptionPlan;
  isActive: boolean;
  createdAt: string;
  memberCount: number;
  ownerId: string;
}

export type SubscriptionPlan = 'basic' | 'solo' | 'enterprise' | 'custom';

export interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: 'active' | 'canceled' | 'past_due' | 'trial';
  trialEndsAt?: string;
  currentPeriodEnd: string;
  createdAt: string;
  priceId: string;
  price: number;
  currency: string;
  usersLimit: number;
  features: SubscriptionFeature[];
}

export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  included: boolean;
}

export interface Case {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  assignedLawyerId: string;
  assignedLawyerName: string;
  status: 'active' | 'closed' | 'pending';
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  description?: string;
}

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

export interface Task {
  id: string;
  title: string;
  description?: string;
  caseId?: string;
  caseName?: string;
  assignedToId: string;
  assignedToName: string;
  assignedById: string;
  assignedByName: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
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

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: 'cases' | 'documents' | 'tasks' | 'finance' | 'users' | 'settings';
  action: 'create' | 'read' | 'update' | 'delete';
}

export interface RolePermission {
  roleId: UserRole;
  permissionId: string;
  granted: boolean;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resourceType: string;
  resourceId: string;
  resourceName: string;
  timestamp: string;
  ipAddress: string;
  metadata?: Record<string, any>;
}

export interface FinancialTransaction {
  id: string;
  clientId: string;
  clientName: string;
  caseId?: string;
  caseName?: string;
  amount: number;
  currency: string;
  type: 'invoice' | 'payment' | 'refund' | 'subscription';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description?: string;
}
