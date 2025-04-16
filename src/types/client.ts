export type ClientStatus = 'active' | 'inactive' | 'prospect';

export interface Client {
  id: string;
  name: string;
  nif: string;
  taxId: string;
  phone: string;
  email: string;
  address: string;
  status: ClientStatus;
  createdAt: Date;
  userId: string;
  lawyerId?: string | null;
  notes?: string;
}