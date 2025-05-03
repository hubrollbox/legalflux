
import { createContext } from 'react';
import { AuthContextType } from '../types/auth';

// Create a default context with all required properties
export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  checkEmailExists: async () => false,
  getRedirectPath: () => '/'
});
