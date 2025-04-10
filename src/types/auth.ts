// Tipos de usuário para o sistema de registro
export type UserType = 'particular' | 'profissional' | 'empresa';

// Dados pessoais (para Particular e Profissional)
export interface PersonalData {
  fullName: string;  // Nome completo
  nif: string;       // NIF (obrigatório)
  email: string;     // Email (obrigatório)
  telefone?: string; // Telemóvel (opcional)
  morada?: string;   // Morada (opcional)
  password: string;  // Senha
}

// Dados profissionais (apenas para Profissional)
export interface ProfessionalData {
  numero_cedula: string;      // Número da Cédula Profissional (obrigatório)
  email_profissional: string; // Email Profissional (obrigatório, deve ser igual ao email pessoal)
  morada_profissional: string; // Morada Profissional (obrigatório)
  ordem_id: string;           // Identificação da Ordem Profissional (obrigatório)
  vinculado_empresa: boolean;  // Se está vinculado a uma empresa
}

// Dados da empresa (para Empresa e Profissional vinculado a empresa)
export interface CompanyData {
  nome: string;      // Nome da Empresa (obrigatório)
  nif: string;       // NIF (obrigatório)
  cae: string;       // CAE (obrigatório)
  email: string;     // Email (obrigatório)
  telefone: string;  // Telefone ou Telemóvel (obrigatório)
  morada: string;    // Morada (obrigatório)
}

// Dados completos do registro
export interface RegisterData {
  userType: UserType;
  personalData?: PersonalData;
  professionalData?: ProfessionalData;
  companyData?: CompanyData;
  acceptTerms: boolean;
}