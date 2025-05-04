
export interface Document {
  id: string;
  name: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  clientId?: string;
  processId?: string;
  version: number;
  createdAt?: string;
  updatedAt?: string;
  size?: string;
  owner?: string;
  folder?: string;
  status?: 'draft' | 'review' | 'final';
  tags?: string[];
}
