export interface Client {
  id: string;
  name: string;
  taxId: string;
  phone: string;
  email: string;
  address: string;
  status: 'active' | 'inactive' | 'prospect';
  createdAt: Date;
  userId: string;
  lawyerId?: string;
}