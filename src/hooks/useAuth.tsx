
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase-client';
import { UserRole } from '../types/permissions';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  getRedirectPath: () => string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  nif: string;
  role?: UserRole;
  phone?: string;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  getRedirectPath: () => '/',
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar se existe sessão no localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        
        // Verificar se existe sessão no Supabase (para futuras implementações)
        // const { data, error } = await supabase.auth.getSession();
        // if (data.session) { ... }
        
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock de login para desenvolvimento (substituir por chamada real ao Supabase no futuro)
      if (email && password) {
        const mockUser: User = {
          id: '1',
          name: 'Utilizador Demo',
          email,
          role: email.includes('admin') ? 'admin' : 
                email.includes('lawyer') ? 'lawyer' : 
                email.includes('senior') ? 'senior_lawyer' : 
                email.includes('assistant') ? 'assistant' : 'client',
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return;
      }
      
      throw new Error('Credenciais inválidas');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao iniciar sessão';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock de registo (substituir por chamada real ao Supabase no futuro)
      const mockUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: userData.role || 'client',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro no registo';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock de pedido de recuperação de password
      console.log(`Pedido de recuperação de password para: ${email}`);
      // Implementação futura com Supabase
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao processar pedido';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock de reposição de password
      console.log(`Reposição de password com token: ${token}`);
      // Implementação futura com Supabase
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao repor a password';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getRedirectPath = () => {
    if (!user) return '/login';
    
    switch(user.role) {
      case 'admin':
        return '/dashboard';
      case 'lawyer':
      case 'senior_lawyer':
        return '/processes';
      case 'assistant':
        return '/tasks';
      case 'client':
        return '/client-portal';
      default:
        return '/';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        login,
        logout,
        register,
        forgotPassword,
        resetPassword,
        getRedirectPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
