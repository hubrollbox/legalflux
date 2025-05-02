
import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'lawyer' | 'assistant' | 'client';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  getRedirectPath: () => string;
  isLoading: boolean; // Add isLoading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Initialize loading state

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulação de login - em produção, isto seria uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Aqui seria validado o login e definido o utilizador
      setUser({
        id: '1',
        name: 'João Silva',
        email: email,
        role: 'lawyer'
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      // Simulação de registo - em produção, isto seria uma chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log('Registering user:', userData);
      
      // Após registo bem-sucedido, faça login automático do utilizador
      setUser({
        id: '2',
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: userData.role || 'client'
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getRedirectPath = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'admin':
        return '/dashboard';
      case 'lawyer':
        return '/dashboard';
      case 'assistant':
        return '/tasks';
      case 'client':
        return '/client-portal';
      default:
        return '/dashboard';
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, getRedirectPath, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
