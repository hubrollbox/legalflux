
import React, { createContext, useContext, useState, useCallback } from 'react';
import { User } from '@/types/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Aqui implementaríamos a lógica real de login com API
      console.log("Login attempt:", email, password);
      
      // Simulação de login bem-sucedido após 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: "1",
        email,
        name: "Usuário de Teste",
        role: "lawyer",
        isActive: true,
        createdAt: new Date().toISOString(),
      };
      
      setUser(mockUser);
      // Armazenar em localStorage para persistência entre sessões
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      // Redirecionar para o dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  const register = useCallback(async (data: any) => {
    try {
      setIsLoading(true);
      // Aqui implementaríamos a lógica real de registro com API
      console.log("Register data:", data);
      
      // Simulação de registro bem-sucedido após 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar para a página de login após registro
      navigate('/login');
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const requestPasswordReset = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      // Aqui implementaríamos a lógica real de solicitação de redefinição de senha
      console.log("Password reset requested for:", email);
      
      // Simulação de solicitação bem-sucedida após 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Password reset request error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (token: string, newPassword: string) => {
    try {
      setIsLoading(true);
      // Aqui implementaríamos a lógica real de redefinição de senha
      console.log("Password reset with token:", token);
      
      // Simulação de redefinição bem-sucedida após 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Password reset error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verificar se há usuário armazenado no localStorage ao iniciar
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
