
export interface User {
  id: string;
  email?: string;
  name?: string;
  role: string;
  isActive?: boolean;
  hasTwoFactorEnabled?: boolean;
  organizationId?: string;
  phone?: string;
  createdAt?: string | Date;
  avatar?: string;
}

export type UserType = "client" | "lawyer" | "senior_lawyer" | "assistant" | "admin";

// Adicionar constantes para UserType
export const UserTypes = {
  CLIENT: "client" as UserType,
  LAWYER: "lawyer" as UserType,
  SENIOR_LAWYER: "senior_lawyer" as UserType,
  ASSISTANT: "assistant" as UserType,
  ADMIN: "admin" as UserType
};

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
