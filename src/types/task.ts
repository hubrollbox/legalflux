
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed' | 'cancelled' | 'in_progress';
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  assignedTo?: string;
  assignedToName?: string;
  processId?: string;
  processName?: string;
  clientId?: string;
  clientName?: string;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string;
  completedBy?: string;
  category?: string;
}
