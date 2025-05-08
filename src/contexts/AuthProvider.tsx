
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
}

// Valor padrão do contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
      throw error;
    }
  };
  
  // Função de logout
  const logout = async () => {
    try {
      // Limpar dados do usuário
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Erro no logout', error);
      throw error;
    }
  };
  
  // Valor do contexto
  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
