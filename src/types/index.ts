
export enum PriorityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface ProcessStatus {
  id: string;
  name: string;
  color: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}

export interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  nif: string;
  address: string;
  representative?: string;
  createdAt: Date;
  processCount: number;
}

export interface ProcessData {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  responsibleId: string;
  responsibleName: string;
  status: string;
  priority: PriorityLevel;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  type: string;
  reference: string;
}

export interface TaskData {
  id: string;
  title: string;
  description: string;
  processId?: string;
  processTitle?: string;
  assignedToId: string;
  assignedToName: string;
  createdById: string;
  createdByName: string;
  status: string;
  priority: PriorityLevel;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
}

export interface DocumentData {
  id: string;
  title: string;
  description?: string;
  filename: string;
  filesize: number;
  fileType: string;
  processId?: string;
  processTitle?: string;
  uploadedById: string;
  uploadedByName: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  version: number;
}
