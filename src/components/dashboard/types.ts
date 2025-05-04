
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
