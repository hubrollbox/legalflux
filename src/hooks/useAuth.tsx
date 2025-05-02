
import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export enum UserRole {
  CLIENT = 'client',
  LAWYER = 'lawyer',
  SENIOR_LAWYER = 'senior_lawyer',
  ASSISTANT = 'assistant',
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, role?: UserRole) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  loading: boolean;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  loading: false,
  isLoading: false,
  error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user in local storage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (email === 'admin@example.com' && password === 'password123') {
        const user = { 
          id: '1', 
          email: 'admin@example.com', 
          name: 'Administrador',
          role: UserRole.ADMIN 
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
        return;
      }
      
      if (email === 'lawyer@example.com' && password === 'password123') {
        const user = { 
          id: '2', 
          email: 'lawyer@example.com', 
          name: 'Advogado',
          role: UserRole.LAWYER 
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
        return;
      }
      
      if (email === 'client@example.com' && password === 'password123') {
        const user = { 
          id: '3', 
          email: 'client@example.com', 
          name: 'Cliente',
          role: UserRole.CLIENT 
        };
        
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
        return;
      }
      
      throw new Error('Credenciais inválidas');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // Clear user from state and local storage
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao fazer logout');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole = UserRole.CLIENT) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration
      const newUser = { 
        id: Date.now().toString(), 
        email, 
        name,
        role 
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao registrar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would trigger a password reset email
      console.log(`Password reset requested for: ${email}`);
    } catch (err) {
      console.error('Forgot password error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao processar pedido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would verify the token and reset the password
      console.log(`Password reset with token: ${token}`);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err instanceof Error ? err.message : 'Erro ao redefinir password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      register, 
      forgotPassword,
      resetPassword,
      loading, 
      isLoading: loading,
      error 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default useAuth;
