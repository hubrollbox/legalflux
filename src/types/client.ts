
export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  nif?: string;
  address?: string;
  createdAt?: string;
  status?: ClientStatus;
}

export type ClientStatus = 'active' | 'inactive' | 'pending' | 'archived';

export interface CreateClientDTO {
  name: string;
  email: string;
  phone?: string;
  nif?: string;
  address?: string;
  status?: ClientStatus;
}

export interface UpdateClientDTO extends Partial<CreateClientDTO> {
  id: string;
}
