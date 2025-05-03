
export interface Process {
  id: string;
  title: string;
  description?: string;
  clientId: string;
  clientName?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'archived' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignedToId?: string;
  assignedToName?: string;
  createdAt: Date;
  updatedAt?: Date;
  dueDate?: Date;
  type?: string;
  court?: string;
  caseNumber?: string;
  tags?: string[];
  progress?: number; // Percentage of completion
  notes?: string[];
  internalReference?: string;
}

export interface ProcessFormData {
  title: string;
  description?: string;
  clientId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'archived' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignedToId?: string;
  dueDate?: Date;
  type?: string;
  court?: string;
  caseNumber?: string;
  tags?: string[];
  internalReference?: string;
}
