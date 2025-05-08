
export type ProcessType = 'civil' | 'criminal' | 'administrative' | 'labor' | 'tax' | 'other';
export type ProcessStatus = 'new' | 'in_progress' | 'completed' | 'archived';

export interface Process {
  id: string;
  title: string;
  number: string;
  type: ProcessType;
  status: ProcessStatus;
  clientId: string;
  startDate: string | Date;
  endDate?: string | Date;
  description?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
  documents?: Array<{
    id: string;
    name: string;
    type?: string;
    status?: string;
    updatedAt?: Date | string;
    version?: number;
  }>;
}

export interface CreateProcessDTO {
  title: string;
  number: string;
  type: ProcessType;
  clientId: string;
  status?: ProcessStatus;
  description?: string;
  startDate: string;
  endDate?: string;
}

export interface UpdateProcessDTO extends Partial<CreateProcessDTO> {
  id: string;
}
