
import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, PanelLeftClose, PanelLeftOpen, LogOut, User, Settings, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/permissions";

// Menu de usuário definido aqui já que estava faltando no arquivo importado
const userMenuItems = [
  {
    label: "Perfil",
    href: "/profile",
    icon: User,
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"] as UserRole[]
  },
  {
    label: "Assinaturas",
    href: "/subscriptions",
    icon: CreditCard,
    roles: ["admin", "lawyer", "senior_lawyer"] as UserRole[]
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: Settings,
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"] as UserRole[]
  },
];

// Utilitário para obter o nome da função do utilizador
const getUserRoleName = (role?: string): string => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'lawyer':
      return 'Advogado';
    case 'senior_lawyer':
      return 'Advogado Sénior';
    case 'assistant':
      return 'Assistente';
    case 'client':
      return 'Cliente';
    default:
      return 'Utilizador';
  }
};

interface HeaderProps {
  user: any;
  toggleMobileSidebar: () => void;
  toggleSidebar: () => void;
  isSidebarCollapsed: boolean;
  logout: () => void;
}

const UserNav: React.FC<{ user: any; onLogout: () => void }> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  
  const filteredMenuItems = userMenuItems.filter(item => {
    if (!authUser?.role) return true;
    return item.roles.includes(authUser.role as UserRole);
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground mt-1">
              {getUserRoleName(user?.role)}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filteredMenuItems.map((item) => (
          <DropdownMenuItem
            key={item.href}
            onClick={() => navigate(item.href)}
            className="flex items-center"
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header: React.FC<HeaderProps> = ({
  user,
  toggleMobileSidebar,
  toggleSidebar,
  isSidebarCollapsed,
  logout
}) => {
  const isMobile = useIsMobile();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileSidebar}
          aria-label="Abrir menu lateral"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={toggleSidebar}
          aria-label={isSidebarCollapsed ? "Expandir menu lateral" : "Colapsar menu lateral"}
        >
          {isSidebarCollapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      <div className="flex-1" />
      
      <div className={cn("flex items-center gap-2", isMobile ? "gap-1" : "gap-3")}>
        <ThemeToggle className="mr-2" />
        <UserNav user={user} onLogout={logout} />
      </div>
    </header>
  );
};

export default Header;
