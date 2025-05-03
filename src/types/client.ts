
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  created_at: string;
  updated_at?: string;
  nif?: string;
  status: 'active' | 'inactive' | 'pending';
  notes?: string;
  photo_url?: string;
}

export interface ClientFormData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  company?: string;
  nif?: string;
  status: 'active' | 'inactive' | 'pending';
  notes?: string;
}
