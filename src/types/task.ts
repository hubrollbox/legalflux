
export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: 'high' | 'medium' | 'low';
  status?: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo?: string;
  processId?: string;
  clientId?: string;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
