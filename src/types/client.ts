
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  nif?: string;
  taxId?: string;
  address?: string;
  createdAt?: string | Date;
  notes?: string;
  status?: ClientStatus;
  userId?: string;
  lawyerId?: string;
}

export type ClientStatus = 'active' | 'inactive' | 'pending' | 'archived' | 'prospect';

export interface CreateClientDTO {
  name: string;
  email: string;
  phone?: string;
  nif?: string;
  taxId?: string;
  address?: string;
  notes?: string;
  status?: ClientStatus;
}

export interface UpdateClientDTO extends Partial<CreateClientDTO> {
  id: string;
}
