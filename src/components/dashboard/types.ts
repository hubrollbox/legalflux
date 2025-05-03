
export type RecentCase = {
  id: string;
  title: string;
  clientName: string;
  clientAvatar: string;
  status: string;
  updatedAt: Date;
};

export type RecentTask = {
  id: string;
  title: string;
  assignedToName: string;
  assignedToAvatar: string;
  priority: PriorityLevel;
};

export enum PriorityLevel {
  HIGH = "high",
  MEDIUM = "medium",
  LOW = "low",
}

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  completed: boolean;
  priority: PriorityLevel;
  assignedTo?: string;
  assignedToName?: string;
  caseId?: string;
  createdAt: Date;
  updatedAt?: Date;
};

export type Case = {
  id: string;
  title: string;
  description?: string;
  status: string;
  clientId: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt?: Date;
  dueDate?: Date;
  priority?: PriorityLevel;
  courtDetails?: {
    courtName?: string;
    caseNumber?: string;
    judge?: string;
    hearingDate?: Date;
  };
};

export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  createdAt: Date;
  updatedAt?: Date;
  notes?: string;
};

export type DashboardStats = {
  activeCases: number;
  completedTasks: number;
  pendingTasks: number;
  upcomingDeadlines: number;
  billedAmount: number;
  pendingAmount: number;
  clientsCount: number;
};
