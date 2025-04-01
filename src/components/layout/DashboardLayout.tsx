import React, { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { getUserRoleName } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  DollarSign,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Home,
  Briefcase,
  CheckSquare,
  UserPlus,
  CreditCard
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRole } from "@/types";
import { LOGO } from "@/assets";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  href: string;
  roles: UserRole[];
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"],
  },
  {
    label: "Processos",
    icon: Briefcase,
    href: "/cases",
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"],
  },
  {
    label: "Tarefas",
    icon: CheckSquare,
    href: "/tasks",
    roles: ["admin", "lawyer", "senior_lawyer", "assistant"],
  },
  {
    label: "Documentos",
    icon: FileText,
    href: "/documents",
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"],
  },
  {
    label: "Clientes",
    icon: Users,
    href: "/clients",
    roles: ["admin", "lawyer", "senior_lawyer"],
  },
  {
    label: "Agenda",
    icon: Calendar,
    href: "/calendar",
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"],
  },
  {
    label: "Mensagens",
    icon: MessageSquare,
    href: "/messages",
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"],
  },
  {
    label: "Financeiro",
    icon: DollarSign,
    href: "/financial",
    roles: ["admin", "lawyer", "senior_lawyer", "client"],
  },
  {
    label: "Utilizadores",
    icon: UserPlus,
    href: "/users",
    roles: ["admin", "senior_lawyer"],
  },
  {
    label: "Assinaturas",
    icon: CreditCard,
    href: "/subscriptions",
    roles: ["admin", "senior_lawyer"],
  },
  {
    label: "Configurações",
    icon: Settings,
    href: "/settings",
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"],
  },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleNavigate = (href: string) => {
    navigate(href);
    closeMobileSidebar();
  };

  const filteredSidebarItems = sidebarItems.filter(
    item => !user?.role || item.roles.includes(user.role)
  );

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <img src={LOGO.DEFAULT} alt="LegalFlux Logo" className="h-24 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Acesso Negado</h1>
          <p className="mb-4">Você precisa fazer login para acessar esta página.</p>
          <Button onClick={() => navigate("/login")}>Fazer Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-primary-950 text-white">
        <div className="p-4 border-b border-primary-900 flex items-center justify-center">
          <img src={LOGO.SMALL} alt="LegalFlux Logo" className="h-8 mr-2" />
          <div>
            <h1 className="text-xl font-bold">LegalFlux</h1>
            <p className="text-xs text-gray-400 mt-1">Gestão Jurídica</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {filteredSidebarItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={`w-full justify-start text-white hover:bg-primary-900 hover:text-white`}
                onClick={() => handleNavigate(item.href)}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-primary-900 hover:text-white mt-4"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </Button>
          </nav>
        </div>
        <div className="p-4 border-t border-primary-900">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{getUserRoleName(user.role)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
          isMobileSidebarOpen ? "block" : "hidden"
        }`}
        onClick={closeMobileSidebar}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-primary-950 text-white z-50 transition-transform duration-300 ease-in-out md:hidden transform ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-primary-900">
          <div className="flex items-center">
            <img src={LOGO.SMALL} alt="LegalFlux Logo" className="h-6 mr-2" />
            <h1 className="text-xl font-bold">LegalFlux</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-primary-900"
            onClick={toggleMobileSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {filteredSidebarItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start text-white hover:bg-primary-900 hover:text-white"
                onClick={() => handleNavigate(item.href)}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-primary-900 hover:text-white mt-4"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </Button>
          </nav>
        </div>
        <div className="p-4 border-t border-primary-900">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{getUserRoleName(user.role)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b py-2 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 md:hidden"
              onClick={() => navigate("/")}
            >
              <Home className="h-4 w-4 mr-2" />
              Início
            </Button>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="py-2 px-4 text-center text-sm text-gray-500">
                  Não há notificações novas.
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden md:flex items-center ml-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{getUserRoleName(user.role)}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
