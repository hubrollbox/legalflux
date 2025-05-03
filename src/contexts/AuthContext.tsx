
import { createContext, useContext } from 'react';
import type { User, RegisterData, PersonalData, CompanyData } from '../types/auth';

// Definição do tipo DetailedUserData como união de dados pessoais e da empresa
export type DetailedUserData = PersonalData & CompanyData;

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (userData: RegisterData | DetailedUserData) => Promise<void>;
  checkEmailExists: (email: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  checkEmailExists: async () => false,
  login: async () => {},
  isLoading: false,
  isAuthenticated: false
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
