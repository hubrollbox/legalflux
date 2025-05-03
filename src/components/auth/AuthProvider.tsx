import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase-client';
import type { User } from '../../types/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
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
        }
      } catch (error) {
        setError(error as Error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getSession();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
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
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
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
      }
    } catch (error) {
      setError(error as Error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: any) => {
    try {
      setLoading(true);
      setError(null);
      const { email, password, ...rest } = userData;
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (data.user) {
        await supabase.from('users').insert([{ id: data.user.id, email, ...rest }]);
        setUser({ id: data.user.id, email, ...rest } as User);
      }
    } catch (error) {
      setError(error as Error);
      setUser(null);
    } finally {
      setLoading(false);
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

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signOut, signUp, checkEmailExists, login: signIn, isLoading: loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;