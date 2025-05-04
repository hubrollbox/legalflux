
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { toast } from "sonner";

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkEmailExists?: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setIsAuthenticated(!!session?.user);
      }
    );

    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setIsAuthenticated(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Login efetuado com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao realizar login");
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        throw error;
      }

      toast.success("Registo efetuado com sucesso! Verifique seu email para confirmar a conta.");
      return data;
    } catch (error: any) {
      toast.error(error.message || "Erro ao realizar registro");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      toast.success("Logout efetuado com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao realizar logout");
      throw error;
    }
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      // Esta é apenas uma implementação simulada
      // Numa implementação real, você pode chamar uma função de backend
      // que verifica se o email existe sem revelar informações sensíveis
      return false;
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    checkEmailExists
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
