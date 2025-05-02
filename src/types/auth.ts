
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
}

export interface PersonalData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface ProfessionalData {
  expertise: string[];
  licenseNumber?: string;
  experience: number;
  acceptTerms: boolean;
}

export interface CompanyData {
  companyName: string;
  taxId: string;
  address: string;
  postalCode: string;
  city: string;
}
