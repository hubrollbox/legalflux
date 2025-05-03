
export type ClientStatus = 'active' | 'inactive' | 'prospect';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  nif: string;
  taxId: string;
  notes?: string;
  status: ClientStatus;
  created_at: string;
  updated_at?: string;
}

export type CreateClientDTO = Omit<Client, 'id' | 'created_at' | 'updated_at'>;
export type UpdateClientDTO = Partial<Omit<Client, 'id' | 'created_at' | 'updated_at'>>;

export interface ClientFilters {
  search?: string;
  status?: ClientStatus;
  sortBy?: 'name' | 'created_at' | 'status';
  sortOrder?: 'asc' | 'desc';
}
