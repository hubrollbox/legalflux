
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase-client';
import { useToast } from '@/hooks/use-toast';
import { Session } from '@supabase/supabase-js';

interface User {
  id: string;
  name: string;
  email: string | undefined;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<{ error: any }>;
  register: (email: string, password: string, name: string) => Promise<{ data: any, error: any }>;
  checkEmailExists: (email: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
  forgotPassword: (email: string) => Promise<{ data: any, error: any }>;
  resetPassword: (accessToken: string, newPassword: string) => Promise<{ data: any, error: any }>;
  getRedirectPath: () => string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Error getting initial session:', sessionError.message);
        setError(sessionError.message);
      } else if (initialSession) {
        setSession(initialSession);
        const supabaseUser = initialSession.user;
        const userRole = supabaseUser.user_metadata?.role || 'client';
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.name || supabaseUser.email || 'Usuário',
          role: userRole,
        });
      }
      setIsLoading(false);
    };

    getInitialSession();

    // Fix the subscription handling
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        const supabaseUser = newSession.user;
        const userRole = supabaseUser.user_metadata?.role || 'client';
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.name || supabaseUser.email || 'Usuário',
          role: userRole,
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      if (authListener && typeof authListener.subscription?.unsubscribe === 'function') {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    if (loginError) {
      console.error('Erro no login:', loginError.message);
      setError(loginError.message);
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: loginError.message || "Não foi possível fazer login. Tente novamente.",
      });
    } else {
      toast({
        title: "Login realizado",
        description: "Login efetuado com sucesso!",
      });
    }
    return { error: loginError };
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          role: 'client',
        },
      },
    });
    setIsLoading(false);
    if (signUpError) {
      console.error('Erro no registro:', signUpError.message);
      setError(signUpError.message);
      toast({
        variant: "destructive",
        title: "Erro ao registrar",
        description: signUpError.message || "Não foi possível registrar. Tente novamente.",
      });
    } else {
      toast({
        title: "Registro realizado",
        description: "Conta criada com sucesso! Verifique seu e-mail para ativação.",
      });
    }
    return { data: signUpData, error: signUpError };
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    const { error: logoutError } = await supabase.auth.signOut();
    setIsLoading(false);
    if (logoutError) {
      console.error('Erro no logout:', logoutError.message);
      setError(logoutError.message);
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: logoutError.message || "Não foi possível sair. Tente novamente.",
      });
    } else {
      toast({
        title: "Logout realizado",
        description: "Sessão encerrada com sucesso.",
      });
    }
    // setUser and setSession will be updated by onAuthStateChange
    return { error: logoutError };
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    // Supabase does not provide a direct way to check if an email exists.
    // You should implement a custom backend function for this.
    // For now, always return false.
    console.warn('checkEmailExists is a placeholder and needs a proper backend implementation.');
    setIsLoading(false);
    return false;
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    const { data, error: forgotPasswordError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsLoading(false);
    if (forgotPasswordError) {
      console.error('Erro ao solicitar recuperação de senha:', forgotPasswordError.message);
      setError(forgotPasswordError.message);
      toast({
        variant: "destructive",
        title: "Erro ao recuperar senha",
        description: forgotPasswordError.message || "Não foi possível solicitar recuperação de senha.",
      });
    } else {
      toast({
        title: "Recuperação de senha",
        description: "E-mail de recuperação enviado com sucesso!",
      });
    }
    return { data, error: forgotPasswordError };
  };

  const resetPassword = async (accessToken: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    const { data, error: resetError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setIsLoading(false);
    if (resetError) {
      console.error('Erro ao redefinir senha:', resetError.message);
      setError(resetError.message);
      toast({
        variant: "destructive",
        title: "Erro ao redefinir senha",
        description: resetError.message || "Não foi possível redefinir a senha.",
      });
    } else {
      toast({
        title: "Senha redefinida",
        description: "Senha alterada com sucesso!",
      });
    }
    return { data, error: resetError };
  };

  const getRedirectPath = () => {
    if (user?.role === "client") {
      return "/client-portal";
    }
    return "/dashboard";
  };

  const contextValue: AuthContextType = {
    isAuthenticated: !!user,
    user,
    session,
    login,
    logout,
    register,
    checkEmailExists,
    isLoading,
    error,
    forgotPassword,
    resetPassword,
    getRedirectPath,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
