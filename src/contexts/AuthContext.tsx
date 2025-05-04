
import { createContext } from 'react';
import type { User } from '../types/auth';

export interface AuthContextType {
  user: User | null;
  session: any | null;
  error: Error | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (code: string, password: string) => Promise<void>;
  checkEmailExists: (email: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (userData: any) => Promise<void>;
  getRedirectPath: () => string;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  error: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  checkEmailExists: async () => false,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  getRedirectPath: () => '/login'
});
