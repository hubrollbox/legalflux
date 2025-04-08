// Definição dos tipos para gestão de clientes

export interface Client {
  id: string;
  name: string;
  nif: string; // Número de Identificação Fiscal
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  userId: string; // ID do advogado/escritório responsável
  status: ClientStatus;
  notes?: string;
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