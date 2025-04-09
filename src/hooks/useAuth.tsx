
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
//Fix the mapUserData function
// Fix duplicate organizationId property in mapUserData
const mapUserData = (userData: any): User => {
  return {
    id: userData.id,
    email: userData.email,
    name: userData.nome_completo || userData.email.split('@')[0],
    role: (userData.funcao || "client") as UserRole,
    isActive: userData.is_active,
    createdAt: userData.created_at,
    lastLogin: userData.last_sign_in_at,
    organizationId: userData.escritorio_id, // Only keep this line
    // Remove the duplicate organizationId below
    hasTwoFactorEnabled: userData.user_metadata?.hasTwoFactorEnabled || false,
    phone: userData.user_metadata?.phone,
    assignedToLawyerId: userData.user_metadata?.assignedToLawyerId,
    avatar: userData.user_metadata?.avatar
  };
};

// Add error boundary to AuthProvider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <h1>Algo deu errado</h1>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Recarregar</button>
      </div>
    );
  }

  try {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { toast } = useToast();
  
    // Verificar a sessão atual ao carregar o componente
    useEffect(() => {
      const checkSession = async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Erro ao verificar sessão:", error);
            toast({
              title: "Erro de autenticação",
              description: "Houve um problema ao verificar sua sessão. Por favor, faça login novamente.",
              variant: "destructive"
            });
            return;
          }
          
          if (session) {
            const mappedUser = mapUserData(session.user);
            setUser(mappedUser);
            
            // Verificar se a sessão está próxima de expirar
            const expiresAt = new Date(session.expires_at * 1000);
            const now = new Date();
            const timeUntilExpiry = expiresAt.getTime() - now.getTime();
            
            if (timeUntilExpiry < 300000) { // 5 minutos
              toast({
                title: "Sessão expirando",
                description: "Sua sessão irá expirar em breve. Por favor, faça login novamente.",
                variant: "destructive"
              });
            }
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
          switch (event) {
            case "SIGNED_IN":
              if (session) {
                const mappedUser = mapUserData(session.user);
                setUser(mappedUser);
                sonnerToast.success("Login realizado com sucesso");
              }
              break;
            case "SIGNED_OUT":
              setUser(null);
              sonnerToast.success("Logout realizado com sucesso");
              break;
            case "TOKEN_REFRESHED":
              if (session) {
                const mappedUser = mapUserData(session.user);
                setUser(mappedUser);
              }
              break;
            case "USER_UPDATED":
              if (session) {
                const mappedUser = mapUserData(session.user);
                setUser(mappedUser);
                sonnerToast.success("Perfil atualizado com sucesso");
              }
              break;
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
  
    const register = async (email: string, password: string, name: string, role?: UserRole): Promise<void> => {
      setIsLoading(true);
      try {
        // Validar permissões RBAC para registro
        if (role && user?.role !== 'admin') {
          throw new Error('Apenas administradores podem criar contas com roles específicas');
        }
    
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              role: role || 'client', // Default para client
              organizationId: user?.organizationId
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
      setIsLoading(true);
      try {
        // Validar alterações de role
        if (updatedUser.role && user?.role !== 'admin') {
          throw new Error('Apenas administradores podem alterar roles');
        }
    
        const { error } = await supabase.auth.updateUser({
          data: updatedUser
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
      } catch (error) {  // Add missing catch block
        console.error("Update error:", error);
      } finally {
        setIsLoading(false);
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
  }; // Remove the trailing semicolon here

  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };
