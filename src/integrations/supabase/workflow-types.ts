export type WorkflowTaskStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface WorkflowTask {
  id: string;
  workflowId: string;
  workflowExecutionId: string;
  stepId: string;
  title: string;
  description: string;
  assignedToId: string;
  assignedToName: string;
  createdById: string;
  createdByName: string;
  status: WorkflowTaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  comments?: string;
  metadata?: Record<string, any>;
}

export interface WorkflowTaskInsert {
  workflowId: string;
  workflowExecutionId: string;
  stepId: string;
  title: string;
  description: string;
  assignedToId: string;
  assignedToName: string;
  createdById: string;
  createdByName: string;
  status: WorkflowTaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  metadata?: Record<string, any>;
}

export interface WorkflowTaskUpdate {
  status?: WorkflowTaskStatus;
  comments?: string;
  completedAt?: string;
  updatedAt: string;
}