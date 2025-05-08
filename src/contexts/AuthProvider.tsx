
import React, { createContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  checkEmailExists: (email: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  getRedirectPath: () => string;
}

// Valor padrão do contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Verificar se existe um usuário no localStorage ao inicializar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao analisar usuário armazenado', error);
        localStorage.removeItem('user');
      }
    }
  }, []);
  
  // Função de login
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simular verificação de credenciais
      // Em uma implementação real, aqui haveria uma chamada à API
      if (email === 'admin@example.com' && password === 'password') {
        const mockUser = {
          id: '1',
          name: 'Administrador',
          email: 'admin@example.com',
          role: 'admin'
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return;
      }
      
      if (email === 'lawyer@example.com' && password === 'password') {
        const mockUser = {
          id: '2',
          name: 'Advogado',
          email: 'lawyer@example.com',
          role: 'lawyer'
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return;
      }
      
      if (email === 'client@example.com' && password === 'password') {
        const mockUser = {
          id: '3',
          name: 'Cliente',
          email: 'client@example.com',
          role: 'client'
        };
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return;
      }
      
      throw new Error('Credenciais inválidas');
    } catch (error) {
      console.error('Erro no login', error);
      setError('Credenciais inválidas');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Função de registro
  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      // Em uma implementação real, aqui haveria uma chamada à API
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        email: email,
        role: 'client'
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Erro no registro', error);
      setError('Erro ao registrar usuário');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para verificar se um email já existe
  const checkEmailExists = async (email: string): Promise<boolean> => {
    // Simulação: em uma implementação real, faria uma chamada à API
    await new Promise(resolve => setTimeout(resolve, 500));
    return false; // Simulando que o email não existe
  };

  // Função de recuperação de senha
  const forgotPassword = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      // Simular envio de email de recuperação
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Erro na recuperação de senha', error);
      setError('Erro ao solicitar recuperação de senha');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Função de redefinição de senha
  const resetPassword = async (token: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      // Simular redefinição de senha
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Erro na redefinição de senha', error);
      setError('Token inválido ou expirado');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Função de logout
  const logout = async () => {
    try {
      setIsLoading(true);
      // Limpar dados do usuário
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Erro no logout', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Obter caminho de redirecionamento com base no perfil do usuário
  const getRedirectPath = () => {
    if (user?.role === "client") {
      return "/client-portal";
    }
    return "/dashboard";
  };
  
  // Valor do contexto
  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    checkEmailExists,
    isLoading,
    error,
    forgotPassword,
    resetPassword,
    getRedirectPath
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
