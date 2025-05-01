
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types for the authentication context
export type UserRole = 'client' | 'lawyer' | 'senior_lawyer' | 'assistant' | 'admin';

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
  register: (userData: any) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  getRedirectPath: () => string;
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

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
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
      // Mock login for development purposes
      // In production, this would call an API endpoint
      if (email && password) {
        // For demo purposes only - INSECURE for production
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
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao iniciar sessão');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock registration
      // Would make an API call in production
      const mockUser: User = {
        id: '2',
        name: userData.name || 'Novo Utilizador',
        email: userData.email,
        role: userData.role || 'client',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro no registo');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock password reset request
      console.log(`Password reset requested for: ${email}`);
      // Would make an API call in production
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao processar pedido');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock password reset
      console.log(`Password reset with token: ${token}`);
      // Would make an API call in production
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao repor a senha');
      throw error;
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

export const useAuth = () => useContext(AuthContext);
