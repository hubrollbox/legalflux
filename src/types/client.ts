// Definição dos tipos para gestão de clientes

export interface Client {
  id: string;
  name: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
  status: ClientStatus;
  criado_em: Date;
  notes?: string;
  userId: string;
  lawyerId?: string;
}

export type ClientStatus = "active" | "inactive" | "prospect";

// Interface para criação de novo cliente
export interface CreateClientDTO {
  name: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  status?: ClientStatus;
}

// Interface para atualização de cliente
export interface UpdateClientDTO {
  name?: string;
  nif?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  status?: ClientStatus;
}