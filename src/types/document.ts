
export type DocumentType = 'document' | 'action' | 'precedent' | 'strategy';

export type DocumentStatus = 'draft' | 'review' | 'final' | 'archived' | 'signed';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  description?: string;
  size: string;
  updatedAt: string;
  owner: string;
  folder: string;
  process: string;
  status?: DocumentStatus;
  version?: number;
  tags?: string[];
  category?: string;
  preview?: string;
  fileUrl?: string;
  title?: string;
  clientId?: string;
  processId?: string;
  url?: string; // Added url for backward compatibility
}

export interface DocumentTemplate {
  id: string;
  name: string;
  type: DocumentType;
  description: string;
  category: string;
  tags?: string[];
  size: string;
  updatedAt: string;
}

export interface DocumentFilter {
  type: string;
  date?: Date;
  tags: string[];
}

// Schema interfaces for forms
export interface DocumentFormValues {
  name: string;
  type: DocumentType;
  description?: string;
  category?: string;
  clientId?: string;
  processId?: string;
  status?: DocumentStatus;
}
