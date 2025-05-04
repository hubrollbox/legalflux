
export interface Client {
  id: string;
  name: string;
  taxId?: string; // NIF
  email?: string;
  phone?: string;
  address?: string;
  status: 'active' | 'inactive' | 'prospect';
  userId?: string;
  lawyerId?: string;
  notes?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt?: Date;
}
