import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session && session.user) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, [supabase]);

  const login = async (email, password) => {
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  const checkEmailExists = async (email: string) => {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .eq('email', email);

    if (error) throw error;
    return count && count > 0;
  };

  const signUp = async (formData: any) => {
    const emailExists = await checkEmailExists(formData.email);
    if (emailExists) throw new Error('Email já registrado');

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          ...formData
        }
      }
    });

    if (error) throw error;
    return data;
  };

  return { user, isAuthenticated, login, logout, signUp, checkEmailExists };
};

export default useAuth;