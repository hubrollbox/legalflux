
import React, { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { supabase } from '../lib/supabase-client';
import { User } from '../types/auth';
import { UserRole } from '../types/permissions';
import { toast } from 'sonner';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Set up auth state listener FIRST to avoid missing auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Basic user setup from session
          const basicUser: User = {
            id: session.user.id,
            email: session.user.email || '',
            created_at: session.user.created_at,
            role: UserRole.CLIENT, // Default role, will be updated from DB
          };
          
          setUser(basicUser);
          
          // Defer the database call using setTimeout to avoid potential Supabase deadlock
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        // Basic user setup from session
        const basicUser: User = {
          id: session.user.id,
          email: session.user.email || '',
          created_at: session.user.created_at,
          role: UserRole.CLIENT, // Default role, will be updated from DB
        };
        
        setUser(basicUser);
        
        // Fetch user details from database
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setUser(data as User);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
    } catch (error: any) {
      setError(error);
      toast.error("Falha no login", { 
        description: error.message || "Verifique as suas credenciais e tente novamente."
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setSession(null);
    } catch (error: any) {
      setError(error);
      toast.error("Erro ao terminar sessão", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Register the user with Supabase auth
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name,
            role: UserRole.CLIENT
          }
        }
      });
      
      if (error) throw error;
      
      // Insert user into our custom users table
      if (data.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ 
            id: data.user.id, 
            email, 
            name, 
            role: UserRole.CLIENT,
            created_at: new Date().toISOString()
          }]);
          
        if (insertError) throw insertError;
      }
      
      toast.success("Registo concluído!", {
        description: "A sua conta foi criada com sucesso."
      });
    } catch (error: any) {
      setError(error);
      toast.error("Falha ao registar", {
        description: error.message || "Ocorreu um erro ao criar a conta."
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password'
      });
      
      if (error) throw error;
      
      toast.success("Email enviado", {
        description: "Verifique o seu email para instruções de recuperação de password."
      });
    } catch (error: any) {
      setError(error);
      toast.error("Erro ao recuperar password", {
        description: error.message
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast.success("Password atualizada", {
        description: "A sua password foi atualizada com sucesso."
      });
    } catch (error: any) {
      setError(error);
      toast.error("Erro ao atualizar password", {
        description: error.message
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const checkEmailExists = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();
        
      return !!data && !error;
    } catch (error) {
      return false;
    }
  };

  // Function to determine redirect path based on user role
  const getRedirectPath = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case UserRole.CLIENT:
        return '/client-portal/processes';
      case UserRole.ADMIN:
      case UserRole.LAWYER:
      case UserRole.SENIOR_LAWYER:
      case UserRole.ASSISTANT:
        return '/dashboard';
      default:
        return '/';
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      error, 
      isLoading: loading, 
      isAuthenticated: !!user,
      login,
      logout,
      register,
      forgotPassword,
      resetPassword,
      checkEmailExists,
      signIn: login,
      signOut: logout,
      signUp: (userData: any) => register(userData.email, userData.password, userData.name),
      getRedirectPath
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
