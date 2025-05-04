
export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  photoUrl?: string;
  nif?: string; // Número de Identificação Fiscal
  userId?: string; // ID de usuário associado ao cliente (para login)
  advogadoId?: string; // ID do advogado associado
  createdAt?: Date;
  updatedAt?: Date;
}
