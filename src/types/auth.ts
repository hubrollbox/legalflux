
import { UserRole } from './permissions';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt?: string;
  phone?: string;
  organizationId?: string;
}

export interface RegisterData {
  personalData: {
    fullName: string;
    email: string;
    phone?: string;
    password: string;
    taxId?: string; // NIF
  };
  professionalData?: {
    licenseNumber: string;
    professionalEmail: string;
    professionalAddress: string;
    barAssociationId: string;
    companyAffiliated: boolean;
  };
  companyData?: {
    name: string;
    nif: string;
    cae: string;
    email: string;
    phone: string;
    address: string;
  };
  acceptTerms: boolean;
  userType: 'individual' | 'professional' | 'company';
}

export type UserType = 'individual' | 'professional' | 'company';
