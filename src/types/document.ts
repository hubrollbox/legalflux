export interface Document {
  id?: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  clientId?: string | undefined;
  processId?: string | undefined;
  version: number;
  createdAt?: Date;
  updatedAt?: Date;
}