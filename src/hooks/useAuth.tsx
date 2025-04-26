import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { UserRole } from "../types/permissions";
import type { User } from "../types";
import type { RegisterData } from "../types/auth";
import { useToast } from "../components/ui/use-toast";
import { toast as sonnerToast } from "sonner";
import { supabase } from "../integrations/supabase/client";

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
  signUp: (userData: RegisterData | DetailedUserData) => Promise<void>;
  checkEmailExists: (email: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (updatedUser: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
  getRedirectPath: () => string;
}

// Interface para o formato detalhado de dados do usuário
interface DetailedUserData {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  phone?: string;
  organizationId?: string;
  userType: 'individual' | 'professional' | 'company';
  tipo: string;
  nome: string;
  criado_em?: string;
  taxId?: string; // Added to support NIF field in SignUpForm
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função para mapear os dados do usuário do Supabase para o formato da aplicação
const mapUserData = (userData: any): User => {
  return {
    id: userData.id,
    email: userData.email,
    name: userData.nome || userData.email.split('@')[0],
    role: (userData.tipo || "client") as UserRole,
    isActive: userData.is_active,
    createdAt: userData.created_at,
    lastLogin: userData.last_sign_in_at,
    organizationId: userData.escritorio_id,
    hasTwoFactorEnabled: userData.user_metadata?.hasTwoFactorEnabled || false,
    phone: userData.user_metadata?.phone,
    assignedToLawyerId: userData.user_metadata?.assignedToLawyerId,
    avatar: userData.user_metadata?.avatar,
    status: userData.status || "active"
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
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
          const expiresAt = session.expires_at ? new Date(session.expires_at * 1000) : new Date();
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
        setError(error as Error);
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
  }, [toast]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error, toast]); // Added toast dependency

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <h1>Erro de Autenticação</h1>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Recarregar</button>
      </div>
    );
  }

  // Função para determinar o caminho de redirecionamento com base na função do utilizador
  const getRedirectPath = (): string => {
    if (!user) return "/login";
    
    switch (user.role) {
      case UserRole.CLIENT:
        return "/client-portal/processes";
      case UserRole.ADMIN:
      case UserRole.LAWYER:
      case UserRole.SENIOR_LAWYER:
      case UserRole.ASSISTANT:
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
      if (role && user?.role !== UserRole.ADMIN) {
        throw new Error('Apenas administradores podem criar contas com roles específicas');
      }

      // Dados de registro estão sendo passados diretamente para o Supabase Auth

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: role || UserRole.CLIENT, // Default para client
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

  // Função unificada de signUp que aceita tanto RegisterData quanto o formato detalhado
  const signUp = async (userData: RegisterData | DetailedUserData): Promise<void> => {
    setIsLoading(true);
    try {
      // Verificar se o email já existe
      const email = 'personalData' in userData ? userData.personalData.email : userData.email;
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        throw new Error('Este email já está em uso.');
      }

      // Preparar dados para o Supabase Auth
      let authOptions: any;
      
      if ('personalData' in userData) {
        // Caso RegisterData
        authOptions = {
          email: userData.personalData.email,
          password: userData.personalData.password,
          options: {
            data: {
              nome: userData.personalData.fullName,
              tipo: 'client', // Default para client
              phone: userData.personalData.phone,
              escritorio_id: user?.organizationId
            }
          }
        };
      } else {
        // Caso formato detalhado
        authOptions = {
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              nome: userData.name,
              tipo: userData.role,
              phone: userData.phone,
              escritorio_id: userData.organizationId,
              user_type: userData.userType,
              password: '',
              criado_em: new Date().toISOString()
            }
          }
        };
      }

      // Registrar o usuário no Supabase Auth
      const { data, error } = await supabase.auth.signUp(authOptions);
      
      if (error) {
        throw error;
      }

      // Se for o formato detalhado e tivermos um usuário criado, criar também na tabela users
      if (!('personalData' in userData) && data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: userData.email,
              nome: userData.name,
              tipo: userData.role,
              phone: userData.phone,
              escritorio_id: userData.organizationId,
              user_type: userData.userType,
              password: '',
              criado_em: new Date().toISOString(),
              is_active: true
            }
          ]);

        if (profileError) throw profileError;

        toast({
          title: 'Registro realizado com sucesso',
          description: 'Por favor, verifique seu email para confirmar o cadastro.',
        });

        sonnerToast.success('Registro realizado! Verifique seu email.');
      } else {
        toast({
          title: "Registro bem-sucedido",
          description: "Sua conta foi criada com sucesso!",
        });
      }

      if (data.user) {
        const mappedUser = mapUserData(data.user);
        setUser(mappedUser);
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Erro",
        description: error.message || "Ocorreu um erro ao tentar criar sua conta.",
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

  const resetPassword = async (_token: string, newPassword: string): Promise<void> => {
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
      if (updatedUser.role && user?.role !== UserRole.ADMIN) {
        throw new Error('Apenas administradores podem alterar roles');
      }
  
      const { error } = await supabase.auth.updateUser({
        data: updatedUser
      });
  
      if (error) {
        throw error;
      }
      
      // Atualizar o estado local
      if (user) {
        const newUserData: User = { ...user, ...updatedUser as User };
        setUser(newUserData);
      }
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar se um email já existe no sistema
  const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Erro ao verificar email:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
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
          signUp,
          checkEmailExists,
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

  // Move useAuth to a separate file (useAuthHook.ts) to avoid Fast Refresh issues.