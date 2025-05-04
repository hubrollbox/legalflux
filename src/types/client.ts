
export interface Client {
  id: string;
  name: string;
  email?: string;
  phone: string;
  taxId: string;
  address?: string;
  notes?: string;
  status: ClientStatus;
  created_at?: string;
  updated_at?: string;
}

export type ClientStatus = 'active' | 'inactive' | 'prospect';

export interface ClientFormValues {
  name: string;
  email: string;
  phone: string;
  taxId: string;
  nif: string;
  address: string;
  status: ClientStatus;
  notes?: string;
}
