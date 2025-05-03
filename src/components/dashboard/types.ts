
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export enum PriorityLevel {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low"
}

export interface StatCard {
  title: string;
  value: string;
  icon: string;
  description?: string;
  trend?: {
    value: number;
    label?: string;
  };
}

export interface RecentCase {
  id: string;
  title: string;
  clientName: string;
  clientAvatar?: string;
  status: string;
  updatedAt: string;
}

export interface RecentTask {
  id: string;
  title: string;
  assignedToName: string;
  assignedToAvatar?: string;
  priority: string;
  dueDate?: string;
}

import type { FinancialTransaction, TransactionType, TransactionStatus } from '../../types';

export interface Case {
  id: string;
  title: string;
  client: string;
  status: string;
  priority: PriorityLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  dueDate: Date;
  priority: PriorityLevel;
  status: string;
  caseId?: string;
  caseName?: string;
}

export interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  nif: string;
  address?: string;
  status: string;
}

export type Client = ClientData;
