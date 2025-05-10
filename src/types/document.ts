
export type DocumentStatus = 'draft' | 'review' | 'final' | 'archived' | 'signed';
export type DocumentType = 'document' | 'action' | 'precedent' | 'strategy';

export interface Document {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  status: DocumentStatus | string;
  type?: DocumentType | string;
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
}
