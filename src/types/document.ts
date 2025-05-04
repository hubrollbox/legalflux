
export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: number;
  createdAt: Date | string;
  updatedAt?: Date | string;
  status: 'draft' | 'review' | 'final' | 'archived';
  processId?: string;
  createdById?: string;
}
