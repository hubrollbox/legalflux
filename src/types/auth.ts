
export interface UserData {
  id: string;
  email: string;
  name?: string;
  role: string;
  avatarUrl?: string;
  createdAt?: string;
}

export type User = UserData;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
  userType?: string;
  companyName?: string;
  nif?: string;
  phone?: string;
  address?: string;
  acceptTerms: boolean;
}

export interface PersonalData {
  name: string;
  email: string;
  phone: string;
  nif: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

export interface CompanyData {
  companyName: string;
  companyNIF: string;
  companyAddress: string;
  companyPhone: string;
  companySize: string;
  industry: string;
}

export interface ProfessionalData {
  professionalTitle: string;
  specialization: string;
  yearsOfExperience: number;
  barAssociation: string;
  barNumber: string;
  acceptTerms: boolean;
}

export enum UserType {
  CLIENT = "client",
  LAWYER = "lawyer",
  ADMIN = "admin",
  ASSISTANT = "assistant",
  SENIOR_LAWYER = "senior_lawyer",
  COMPANY = "company"
}
