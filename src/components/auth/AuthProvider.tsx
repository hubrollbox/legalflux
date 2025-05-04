
import React, { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase-client';
import { User } from '../../types/auth';
import { UserRole } from '../../types/permissions';
import { Toaster } from 'sonner';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          if (error) throw error;
          setUser(data as User);
          setSession(session);
        }
      } catch (error) {
        setError(error as Error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    getSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        if (session?.user) {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          if (error) {
            setUser(null);
          } else {
            setUser(data as User);
            setSession(session);
          }
        } else {
          setUser(null);
          setSession(null);
        }
        setIsLoading(false);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();
        if (userError) throw userError;
        setUser(userData as User);
        setSession(data.session);
      }
    } catch (error) {
      setError(error as Error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (data.user) {
        await supabase.from('users').insert([{ id: data.user.id, email, name }]);
        setUser({ id: data.user.id, email, name } as User);
        setSession(data.session);
      }
    } catch (error) {
      setError(error as Error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await supabase.auth.resetPasswordForEmail(email);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (code: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await supabase.auth.updateUser({ password });
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkEmailExists = async (email: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();
    return !!data && !error;
  };

  const getRedirectPath = () => {
    if (user?.role === UserRole.CLIENT) {
      return '/client-portal/processes';
    } else if (user) {
      return '/dashboard';
    }
    return '/login';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      error, 
      isLoading, 
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
