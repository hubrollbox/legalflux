
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
  lastLogin?: string;
  organizationId?: string;
  hasTwoFactorEnabled?: boolean;
  phone?: string;
  assignedToLawyerId?: string;
  avatar?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface Process {
  id: string;
  title: string;
  clientId: string;
  lawyerId: string;
  status: 'active' | 'closed' | 'pending';
  type: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  deadline?: string;
  reference?: string;
}

export interface Document {
  id: string;
  title: string;
  processId?: string;
  clientId?: string;
  lawyerId: string;
  status: 'draft' | 'pending' | 'final' | 'review';
  type: string;
  createdAt: string;
  updatedAt: string;
  fileUrl?: string;
  fileSize?: number;
  version?: number;
  tags?: string[];
}
