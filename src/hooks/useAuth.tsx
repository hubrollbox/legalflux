
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole } from "@/types";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole
  ) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (updatedUser: Partial<User>) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@legalflux.com",
    name: "Admin Demo",
    role: "admin",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    hasTwoFactorEnabled: true,
    organizationId: "1",
  },
  {
    id: "2",
    email: "lawyer@legalflux.com",
    name: "Advogado Demo",
    role: "lawyer",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    hasTwoFactorEnabled: false,
    organizationId: "1",
  },
  {
    id: "3",
    email: "client@legalflux.com",
    name: "Cliente Demo",
    role: "client",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    hasTwoFactorEnabled: false,
  },
  {
    id: "4",
    email: "senior@legalflux.com",
    name: "Advogado Sênior Demo",
    role: "senior_lawyer",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    hasTwoFactorEnabled: false,
    organizationId: "1",
  },
  {
    id: "5",
    email: "assistant@legalflux.com",
    name: "Assistente Demo",
    role: "assistant",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    hasTwoFactorEnabled: false,
    organizationId: "1",
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user in localStorage on mount
    const storedUser = localStorage.getItem("legalflux-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Find user by email (in a real app, this would be a server call)
      const foundUser = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (foundUser) {
        // In a real app, you'd validate the password here
        foundUser.lastLogin = new Date().toISOString();
        setUser(foundUser);
        localStorage.setItem("legalflux-user", JSON.stringify(foundUser));
        toast({
          title: "Login bem-sucedido",
          description: `Bem-vindo de volta, ${foundUser.name}!`,
        });
      } else {
        toast({
          title: "Falha no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao tentar fazer login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem("legalflux-user");
    setUser(null);
    toast({
      title: "Logout bem-sucedido",
      description: "Você saiu da sua conta.",
    });
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        toast({
          title: "Falha no registro",
          description: "Este email já está em uso.",
          variant: "destructive",
        });
        return;
      }
      
      // Create new user
      const newUser: User = {
        id: String(MOCK_USERS.length + 1),
        email,
        name,
        role,
        isActive: true,
        createdAt: new Date().toISOString(),
        hasTwoFactorEnabled: false,
      };
      
      // In a real app, you'd save this to a database
      MOCK_USERS.push(newUser);
      
      toast({
        title: "Registro bem-sucedido",
        description: "Sua conta foi criada com sucesso!",
      });
      
      // Auto login
      setUser(newUser);
      localStorage.setItem("legalflux-user", JSON.stringify(newUser));
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
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (foundUser) {
        toast({
          title: "Email enviado",
          description: "Verifique seu email para redefinir sua senha.",
        });
      } else {
        toast({
          title: "Email enviado",
          description: "Se este email estiver registrado, você receberá instruções de redefinição.",
        });
      }
    } catch (error) {
      console.error("Password reset request error:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao solicitar a redefinição de senha.",
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Senha redefinida",
        description: "Sua senha foi redefinida com sucesso.",
      });
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao redefinir sua senha.",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (updatedUser: Partial<User>): Promise<void> => {
    try {
      if (!user) return;
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Update user data
      const newUserData = { ...user, ...updatedUser };
      setUser(newUserData);
      localStorage.setItem("legalflux-user", JSON.stringify(newUserData));
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Profile update error:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar seu perfil.",
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
