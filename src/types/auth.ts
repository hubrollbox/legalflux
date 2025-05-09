
export enum UserType {
  CLIENT = 'client',
  PROFESSIONAL = 'professional',
  COMPANY = 'company'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "lawyer" | "senior_lawyer" | "assistant" | "ADMIN";
  createdAt: string;
  isActive: boolean;
  hasTwoFactorEnabled: boolean;
  organizationId?: string;
  phone?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}
