
export type DocumentStatus = 'draft' | 'review' | 'final' | 'archived' | 'signed' | 'unsigned';
export type DocumentType = 'document' | 'contract' | 'petition' | 'template' | 'action' | 'precedent' | 'strategy';

export interface DocumentFilter {
  type: string;
  date?: Date | undefined;
  tags: string[];
}

export interface Document {
  id: string;
  name: string;
  title?: string;
  description?: string;
  content?: string;
  type: DocumentType;
  status: DocumentStatus;
  size: string | number;
  updatedAt: string | Date;
  createdAt: string | Date;
  owner?: string;
  folder?: string;
  process?: string;
  clientId?: string;
  clientName?: string;
  tags?: string[];
  fileUrl?: string;
  preview?: string;
  category?: string;
  version?: string;
  processId?: string;
  url?: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description?: string;
  content?: string;
  type: DocumentType;
  category: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  tags?: string[];
  size?: string | number;
}
