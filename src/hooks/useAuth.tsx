
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { toast as sonnerToast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    email: string, 
    password: string, 
    name: string,
    role?: UserRole
  ) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (updatedUser: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  getRedirectPath: () => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função para mapear os dados do usuário do Supabase para o formato da aplicação
const mapUserData = (userData: any): User => {
  return {
    id: userData.id,
    email: userData.email,
    name: userData.user_metadata?.name || userData.email.split('@')[0],
    role: userData.user_metadata?.role || "client",
    isActive: true,
    createdAt: userData.created_at,
    lastLogin: userData.last_sign_in_at || userData.created_at,
    hasTwoFactorEnabled: userData.user_metadata?.hasTwoFactorEnabled || false,
    organizationId: userData.user_metadata?.organizationId,
    phone: userData.user_metadata?.phone,
    assignedToLawyerId: userData.user_metadata?.assignedToLawyerId,
    avatar: userData.user_metadata?.avatar
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Verificar a sessão atual ao carregar o componente
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Erro ao verificar sessão:", error);
          return;
        }
        
        if (data.session) {
          const userData = data.session.user;
          const mappedUser = mapUserData(userData);
          setUser(mappedUser);
        }
      } catch (error) {
        console.error("Erro ao verificar sessão:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Configurar listener para mudanças de autenticação
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const mappedUser = mapUserData(session.user);
          setUser(mappedUser);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Função para determinar o caminho de redirecionamento com base na função do utilizador
  const getRedirectPath = (): string => {
    if (!user) return "/login";
    
    switch (user.role) {
      case "client":
        return "/client-portal/processes";
      case "admin":
      case "lawyer":
      case "senior_lawyer":
      case "assistant":
        return "/dashboard";
      default:
        return "/dashboard";
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        const mappedUser = mapUserData(data.user);
        setUser(mappedUser);
        
        // Mostrar mensagem personalizada com base no tipo de utilizador
        const welcomeMessage = mappedUser.role === "client" 
          ? "Bem-vindo ao Portal do Cliente!" 
          : `Bem-vindo de volta, ${mappedUser.name}!`;
        
        toast({
          title: "Login bem-sucedido",
          description: welcomeMessage,
        });
        
        // Também mostrar um toast via sonner para garantir que o utilizador vê a mensagem
        sonnerToast.success(welcomeMessage);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Falha no login",
        description: error.message || "Email ou senha incorretos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      toast({
        title: "Logout bem-sucedido",
        description: "Você saiu da sua conta.",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        title: "Erro ao sair",
        description: error.message || "Ocorreu um erro ao tentar sair.",
        variant: "destructive",
      });
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole = "client"
  ): Promise<void> => {
    setIsLoading(true);
    try {
      // Verificar se o email já está em uso
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();
      
      if (existingUser) {
        toast({
          title: "Falha no registro",
          description: "Este email já está em uso.",
          variant: "destructive",
        });
        return;
      }
      
      // Registrar o usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
            isActive: true,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            hasTwoFactorEnabled: false,
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Registro bem-sucedido",
        description: "Sua conta foi criada com sucesso!",
      });
      
      if (data.user) {
        const mappedUser = mapUserData(data.user);
        setUser(mappedUser);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar criar sua conta.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (email: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Email enviado",
        description: "Verifique seu email para redefinir sua senha.",
      });
    } catch (error: any) {
      console.error("Password reset request error:", error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao solicitar a redefinição de senha.",
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Senha redefinida",
        description: "Sua senha foi redefinida com sucesso.",
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao redefinir sua senha.",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (updatedUser: Partial<User>): Promise<void> => {
    try {
      if (!user) return;
      
      // Atualizar os metadados do usuário no Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          name: updatedUser.name || user.name,
          role: updatedUser.role || user.role,
          phone: updatedUser.phone || user.phone,
          hasTwoFactorEnabled: updatedUser.hasTwoFactorEnabled !== undefined 
            ? updatedUser.hasTwoFactorEnabled 
            : user.hasTwoFactorEnabled,
          organizationId: updatedUser.organizationId || user.organizationId,
          avatar: updatedUser.avatar || user.avatar,
          assignedToLawyerId: updatedUser.assignedToLawyerId || user.assignedToLawyerId
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Atualizar o estado local
      const newUserData = { ...user, ...updatedUser };
      setUser(newUserData);
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao atualizar seu perfil.",
        variant: "destructive",
      });
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        requestPasswordReset,
        resetPassword,
        updateProfile,
        isAuthenticated: !!user,
        getRedirectPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
