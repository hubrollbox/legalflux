
export type DocumentStatus = 'draft' | 'review' | 'final' | 'archived' | 'signed';
export type DocumentType = 'document' | 'action' | 'precedent' | 'strategy';

export interface Document {
  id: string;
  title?: string;
  name: string; // Required property
  description?: string;
  status: DocumentStatus;
  type: DocumentType;
  createdAt: string | Date;
  updatedAt?: string | Date;
  version?: string | number;
  size?: string | number; // Allow both number and string for flexibility
  owner?: string;
  tags?: string[];
  processId?: string;
  folder?: string;
  process?: string;
  url?: string;
  category?: string;
  clientId?: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  createdAt: string | Date;
  type: DocumentType;
  updatedAt?: string | Date; // Added to match usage in code
  size?: string | number; // Added to match usage in code
}

export interface DocumentFilter {
  type?: string;
  date?: Date;
  tags?: string[];
}
