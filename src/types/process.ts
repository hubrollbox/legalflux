
export interface Process {
  id: string;
  title: string;
  number?: string;
  type: 'civil' | 'criminal' | 'labor' | 'administrative' | 'tax' | 'other';
  status: 'new' | 'in_progress' | 'completed' | 'archived';
  startDate?: string;
  endDate?: string;
  clientId?: string;
  description?: string;
  assignedTo?: string;
  courtId?: string;
  priority?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
