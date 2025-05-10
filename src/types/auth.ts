
export type UserRole = "client" | "lawyer" | "senior_lawyer" | "assistant" | "admin";

// Add UserType and UserTypes for PersonalDataStep and SignUpForm components
export type UserType = "particular" | "professional" | "company";

export const UserTypes = {
  CLIENT: "particular",
  PROFESSIONAL: "professional",
  COMPANY: "company"
};

export interface User {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  avatar?: string;
  organization?: string;
  organizationId?: string;
  isActive?: boolean;
  hasTwoFactorEnabled?: boolean;
  phone?: string;
  createdAt?: string | Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegistrationData {
  name: string;
  email: string;
  password: string;
  organizationName?: string;
  acceptTerms: boolean;
}

export interface ResetPasswordData {
  email: string;
}

export interface NewPasswordData {
  password: string;
  confirmPassword: string;
  token: string;
}

// Permissions related to each user role
export const USER_ROLE_NAMES: Record<UserRole, string> = {
  client: "Cliente",
  lawyer: "Advogado",
  senior_lawyer: "Advogado Sénior",
  assistant: "Assistente",
  admin: "Administrador"
};

// Create UserRoles for components that need it
export const UserRoles = {
  CLIENT: "client" as UserRole,
  LAWYER: "lawyer" as UserRole,
  SENIOR_LAWYER: "senior_lawyer" as UserRole,
  ASSISTANT: "assistant" as UserRole,
  ADMIN: "admin" as UserRole
};
