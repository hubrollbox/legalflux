
import { User, AuthContextType } from '@/types/auth';
import { createContext, useContext, useState, useEffect } from 'react';

// Criar contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Provider para o contexto de autenticação
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Simular verificação de sessão no carregamento inicial
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // Em uma implementação real, você verificaria a sessão do usuário aqui
        // Por exemplo, verificando um token JWT no localStorage ou usando uma API de sessão

        // Simulação de verificação de sessão
        const userSession = localStorage.getItem('user');
        
        if (userSession) {
          const parsedUser = JSON.parse(userSession);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Erro ao verificar sessão:", err);
        setError("Falha ao verificar a sua sessão.");
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // Função de login
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Em uma implementação real, você chamaria a sua API de autenticação aqui
      // Simulação de login
      if (email && password) {
        // Simular um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: '1',
          email: email,
          name: 'Utilizador Demo',
          role: 'lawyer'
        };
        
        // Guardar no localStorage para persistência da sessão
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsAuthenticated(true);
      } else {
        throw new Error('Email e senha são obrigatórios');
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError(err instanceof Error ? err.message : 'Falha ao fazer login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função de criação de conta
  const signup = async (email: string, password: string, userInfo: any) => {
    try {
      setLoading(true);
      setError(null);
      
      // Em uma implementação real, você chamaria a sua API de registro aqui
      // Simulação de registro
      if (email && password) {
        // Simular um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser = {
          id: `${Math.floor(Math.random() * 1000)}`,
          email: email,
          name: userInfo.fullName || 'Novo Utilizador',
          role: userInfo.role || 'client'
        };
        
        // Guardar no localStorage para persistência da sessão
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setIsAuthenticated(true);
      } else {
        throw new Error('Email e senha são obrigatórios');
      }
    } catch (err) {
      console.error("Erro ao criar conta:", err);
      setError(err instanceof Error ? err.message : 'Falha ao criar conta');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = async () => {
    try {
      setLoading(true);
      
      // Em uma implementação real, você chamaria a sua API de logout aqui
      // Simulação de logout
      localStorage.removeItem('user');
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      setError(err instanceof Error ? err.message : 'Falha ao fazer logout');
    } finally {
      setLoading(false);
    }
  };

  // Função para obter o caminho de redirecionamento com base no papel do usuário
  const getRedirectPath = () => {
    if (user?.role === 'client') {
      return '/client-portal';
    } else if (user) {
      return '/dashboard';
    }
    return '/login';
  };

  // Valor do contexto
  const value = {
    user,
    signup,
    login,
    logout,
    loading,
    error,
    isAuthenticated,
    session: null,
    register: signup,
    forgotPassword: async () => {},
    resetPassword: async () => {},
    checkEmailExists: async () => false,
    signIn: login,
    signOut: logout,
    signUp: signup,
    getRedirectPath
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
