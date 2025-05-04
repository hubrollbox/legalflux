
export interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  fileType?: string;
  size?: number;
  clientId?: string;
  processId?: string;
  version?: number;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'draft' | 'review' | 'final' | 'archived';
  tags?: string[];
  sharedWith?: string[];
  downloadUrl?: string;
  filename?: string;
  signatureRequired?: boolean;
  signed?: boolean;
  signatories?: string[];
  comments?: string[];
}
