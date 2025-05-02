
import { UserRole } from './permissions';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}
