
export type DocumentStatus = 'draft' | 'review' | 'final' | 'archived' | 'signed';
export type DocumentType = 'document' | 'action' | 'precedent' | 'strategy';

export interface Document {
  id: string;
  title?: string;
  name: string; // Changed from optional to required
  description?: string;
  status: DocumentStatus;
  type: DocumentType;
  createdAt: string | Date;
  updatedAt?: string | Date;
  version?: string;
  size?: number;
  owner?: string;
  tags?: string[];
  processId?: string;
  folder?: string;
  process?: string;
  url?: string;
  category?: string; // Added missing property
  clientId?: string; // Added missing property
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  createdAt: string | Date;
  type: DocumentType;
}

export interface DocumentFilter {
  type?: string;
  date?: Date;
  tags?: string[];
}
