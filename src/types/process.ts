
export interface Process {
  id: string;
  title: string;
  description?: string;
  status: ProcessStatus;
  type: string;
  number: string;
  clientId?: string;
  clientName?: string;
  assignedTo?: string;
  assignedToName?: string;
  startDate?: string;
  dueDate?: string;
  priority?: 'high' | 'medium' | 'low';
  court?: string;
  judge?: string;
  created_at?: string;
  updated_at?: string;
}

export type ProcessStatus = 'active' | 'closed' | 'pending' | 'archived';

export interface ProcessFilter {
  status?: ProcessStatus[];
  type?: string[];
  clientId?: string;
  assignedTo?: string;
  startDateFrom?: Date;
  startDateTo?: Date;
  dueDateFrom?: Date;
  dueDateTo?: Date;
  priority?: string[];
  search?: string;
}
