// Tipos de usuário para o sistema de registro
export type UserType = 'individual' | 'professional' | 'company';

// Funções de usuário no sistema
export type UserRole = 'admin' | 'lawyer' | 'senior_lawyer' | 'assistant' | 'client';

// Interface do usuário
export interface RegisterData {
  userType: 'individual' | 'professional' | 'company';
  personalData: {
    fullName: string;
    email: string;
    phone?: string;
    password: string;
  };
  acceptTerms: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  organizationId?: string;
  assignedToLawyerId?: string;
  hasTwoFactorEnabled?: boolean;
  phone?: string;
  avatar?: string;
}

// Dados pessoais (para Individual e Professional)
export interface PersonalData {
  fullName: string;  // Nome completo
  nif: string;       // NIF (obrigatório)
  email: string;     // Email (obrigatório)
  phone?: string;    // Telemóvel (opcional)
  address?: string;  // Morada (opcional)
  password: string;  // Senha
}

// Dados profissionais (apenas para Professional)
export interface ProfessionalData {
  licenseNumber: string;     // Número da Cédula Profissional (obrigatório)
  professionalEmail: string; // Email Profissional (obrigatório)
  professionalAddress: string; // Morada Profissional (obrigatório)
  barAssociationId: string;  // Identificação da Ordem Profissional (obrigatório)
  companyAffiliated: boolean; // Se está vinculado a uma empresa
}

// Dados da empresa (para Company e Professional vinculado a empresa)
export interface CompanyData {
  name: string;      // Nome da Empresa (obrigatório)
  nif: string;       // NIF (obrigatório)
  cae: string;       // CAE (obrigatório)
  email: string;     // Email (obrigatório)
  phone: string;     // Telefone ou Telemóvel (obrigatório)
  address: string;   // Morada (obrigatório)
}

// Dados completos do registro
export interface RegisterData {
  userType: UserType;
  personalData: {
    fullName: string;
    email: string;
    phone?: string;
    password: string;
  };
  professionalData?: ProfessionalData;
  companyData?: CompanyData;
  acceptTerms: boolean;
}

// Interface para o contexto de autenticação
export interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  checkEmailExists: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}