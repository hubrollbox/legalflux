// Definição dos tipos para gestão de clientes

export interface Client {
  id: string;
  name: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
  status: ClientStatus;
  notes?: string;
  userId: string;
  lawyerId: string | null;
  createdAt: Date;
  // Portuguese API fields
  nome?: string;
  telefone?: string;
  morada?: string;
  estado?: string;
  notas?: string;
  advogado_id?: string | null;
  criado_em?: string;
  taxId: string;
  // Ensure the Client type definition includes all necessary fields for type consistency.
}

export type ClientStatus = "active" | "inactive" | "prospect";

// Interface para criação de novo cliente
export interface CreateClientDTO {
  name: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
  notes?: string | undefined;
  status?: ClientStatus;
}

// Interface para atualização de cliente
export interface UpdateClientDTO {
  name?: string;
  nif?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string | undefined;
  status?: ClientStatus;
}