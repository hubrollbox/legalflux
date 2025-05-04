
export interface Process {
  id: string;
  title: string;
  description?: string;
  number?: string; // Número do processo
  status?: 'active' | 'pending' | 'closed' | 'archived';
  type?: string;
  area?: string;
  clientId?: string;
  assignedTo?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  deadline?: Date;
  priority?: 'high' | 'medium' | 'low';
  court?: string;
  judge?: string;
  value?: number;
  valueType?: 'fixed' | 'hourly' | 'percentage';
  documents?: string[];
  tags?: string[];
}
