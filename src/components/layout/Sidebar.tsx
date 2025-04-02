
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { UserRole } from "@/types";
import { LOGO } from "@/assets";
import UserProfile from "./UserProfile";
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  DollarSign,
  LogOut,
  Briefcase,
  CheckSquare,
  UserPlus,
  CreditCard,
  X
} from "lucide-react";

interface SidebarItem {
  label: string;
  icon: React.ElementType;
  href: string;
  roles: UserRole[];
}

interface SidebarProps {
  user: any;
  logout: () => void;
  isMobileSidebarOpen: boolean;
  closeMobileSidebar: () => void;
  isCollapsed?: boolean;
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Painel",
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

const Sidebar: React.FC<SidebarProps> = ({
  user,
  logout,
  isMobileSidebarOpen,
  closeMobileSidebar,
  isCollapsed = false,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (href: string) => {
    navigate(href);
    closeMobileSidebar();
  };

  const filteredSidebarItems = sidebarItems.filter(
    (item) => !user?.role || item.roles.includes(user.role)
  );

  // Desktop Sidebar using shadcn/ui sidebar
  const DesktopSidebar = (
    <ShadcnSidebar
      collapsible={isCollapsed ? "icon" : "none"}
      className="hidden md:flex"
    >
      <SidebarHeader className="flex flex-col items-center justify-center p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-center">
          <img src={LOGO.SMALL} alt="LegalFlux Logo" className="h-8 mr-2" />
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-sidebar-foreground">LegalFlux</h1>
              <p className="text-xs text-muted-foreground">Gestão Jurídica</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {filteredSidebarItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                onClick={() => handleNavigate(item.href)}
                tooltip={item.label}
              >
                <item.icon className="mr-2 h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                logout();
                navigate("/login");
              }}
              tooltip="Sair"
            >
              <LogOut className="mr-2 h-5 w-5" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      {!isCollapsed && (
        <SidebarFooter>
          <UserProfile user={user} />
        </SidebarFooter>
      )}
    </ShadcnSidebar>
  );

  // Mobile Sidebar Overlay
  const MobileSidebarOverlay = (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
        isMobileSidebarOpen ? "block" : "hidden"
      }`}
      onClick={closeMobileSidebar}
    />
  );

  // Mobile Sidebar Content
  const MobileSidebar = (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-sidebar text-sidebar-foreground z-50 transition-transform duration-300 ease-in-out md:hidden transform ${
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-sidebar-border">
        <div className="flex items-center">
          <img src={LOGO.SMALL} alt="LegalFlux Logo" className="h-6 mr-2" />
          <h1 className="text-xl font-bold">LegalFlux</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={closeMobileSidebar}
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
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => handleNavigate(item.href)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Button>
          ))}
          <Button
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mt-4"
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
      <UserProfile user={user} />
    </div>
  );

  return (
    <>
      {DesktopSidebar}
      {MobileSidebarOverlay}
      {MobileSidebar}
    </>
  );
};

export default Sidebar;
