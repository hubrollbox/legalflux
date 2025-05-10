
export type ProcessType = 'civil' | 'criminal' | 'administrative' | 'labor' | 'tax' | 'other';
export type ProcessStatus = 'new' | 'in_progress' | 'completed' | 'archived';

export interface Process {
  id: string;
  title: string;
  clientId: string;
  clientName?: string;
  number: string;
  type: ProcessType;
  description?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  status: ProcessStatus;
  deadline?: string | Date;
  documents?: Document[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateProcessDTO {
  title: string;
  clientId: string;
  number: string;
  type: ProcessType;
  description?: string;
  startDate: string;
  endDate?: string;
  status: ProcessStatus;
}

export interface UpdateProcessDTO extends Partial<CreateProcessDTO> {
  id: string;
}
