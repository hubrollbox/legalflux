
import { UserRole } from './permissions';

export interface User {
  id: string;
  name?: string;
  email: string;
  created_at: string;
  role: UserRole;
  avatar_url?: string;
  company_id?: string;
  permissions?: string[];
  last_sign_in_at?: string;
  metadata?: {
    [key: string]: any;
  };
}

export interface AuthState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  checkEmailExists: (email: string) => Promise<boolean>;
  signIn?: (email: string, password: string) => Promise<void>;
  signOut?: () => Promise<void>;
  signUp?: (userData: any) => Promise<void>;
  getRedirectPath?: () => string;
}
