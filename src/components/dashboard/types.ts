
import { ReactNode } from 'react';
import { PriorityLevel } from '@/types/priority-level';

export interface StatCard {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
}

export interface RecentCase {
  id: string;
  title: string;
  clientName: string;
  clientAvatar: string;
  status: 'active' | 'pending' | 'closed';
  updatedAt: Date;
}

export interface RecentTask {
  id: string;
  title: string;
  assignedToName: string;
  assignedToAvatar: string;
  priority: PriorityLevel;
  status?: string;
}

export interface Case {
  id: string;
  title: string;
  status: string;
  client?: string;
}

export interface Task {
  id: string;
  title: string;
  status: string;
  priority?: PriorityLevel;
}

// Exporte PriorityLevel para uso em outros arquivos
export type { PriorityLevel };

// Interface para Cliente
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  nif?: string;
  created_at?: string;
}
