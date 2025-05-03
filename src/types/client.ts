
export type ClientStatus = 'active' | 'inactive' | 'prospect';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  nif: string;
  notes?: string;
  status: ClientStatus;
  createdAt: Date;
  updatedAt?: Date;
  userId: string;
  lawyerId?: string;
}

export type CreateClientDTO = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateClientDTO = Partial<Omit<Client, 'id' | 'createdAt' | 'updatedAt'>>;

export interface ClientFilters {
  search?: string;
  status?: ClientStatus;
  sortBy?: 'name' | 'createdAt' | 'status';
  sortOrder?: 'asc' | 'desc';
}
