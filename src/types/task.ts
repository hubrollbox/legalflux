
export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'cancelled' | 'pending' | 'in-progress';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string | Date;
  priority?: PriorityLevel;
  assigneeId?: string;
  processId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
