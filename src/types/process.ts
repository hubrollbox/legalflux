
import { Document } from './document';

export type ProcessStatus = 'new' | 'in_progress' | 'completed' | 'archived';

export type ProcessType = 'civil' | 'criminal' | 'labor' | 'administrative' | 'tax' | 'other';

export interface Process {
  id: string;
  title: string;
  number?: string;
  type: ProcessType;
  status: ProcessStatus;
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

export interface CreateProcessDTO {
  title: string;
  number?: string;
  type: ProcessType;
  status: ProcessStatus;
  startDate?: string;
  clientId?: string;
  description?: string;
  assignedTo?: string;
  courtId?: string;
  priority?: string;
}

export interface UpdateProcessDTO {
  id: string;
  title?: string;
  number?: string;
  type?: ProcessType;
  status?: ProcessStatus;
  startDate?: string;
  endDate?: string;
  clientId?: string;
  description?: string;
  assignedTo?: string;
  courtId?: string;
  priority?: string;
}

export interface ProcessWithDocuments extends Process {
  documents?: Document[];
}
