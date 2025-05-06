
import { 
  Home, 
  FileText, 
  Users, 
  Calendar, 
  Settings, 
  MessageSquare, 
  Book, 
  Briefcase,
  DollarSign,
  Link,
  HelpCircle,
  LogOut,
  User,
  CreditCard
} from "lucide-react";
import { ComponentType } from "react";
import { UserRole } from "@/types/permissions";

export interface SidebarItem {
  name: string;
  href: string;
  icon: ComponentType<any>;
  items?: SidebarSubItem[];
  roles?: UserRole[];
}

interface SidebarSubItem {
  name: string;
  href: string;
  roles?: UserRole[];
}

export const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT]
  },
  {
    name: "Processos",
    href: "/processes",
    icon: Briefcase,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT]
  },
  {
    name: "Clientes",
    href: "/clients",
    icon: Users,
    roles: ["admin", "lawyer", "senior_lawyer", "assistant"]
  },
  {
    name: "Documentos",
    href: "/documents",
    icon: FileText,
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"]
  },
  {
    name: "Calendário",
    href: "/calendar",
    icon: Calendar,
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"]
  },
  {
    name: "Mensagens",
    href: "/messages",
    icon: MessageSquare,
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"]
  },
  {
    name: "Financeiro",
    href: "/financial",
    icon: DollarSign,
    roles: ["admin", "lawyer", "senior_lawyer"]
  },
  {
    name: "Links Úteis",
    href: "/useful-links",
    icon: Link,
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"]
  },
  {
    name: "Central de Ajuda",
    href: "/help-center",
    icon: HelpCircle,
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"]
  },
  {
    name: "Configurações",
    href: "/settings",
    icon: Settings,
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"]
  },
];

export const userMenuItems = [
  {
    label: "Perfil",
    href: "/profile",
    icon: User,
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"]
  },
  {
    label: "Assinaturas",
    href: "/subscriptions",
    icon: CreditCard,
    roles: ["admin", "lawyer", "senior_lawyer"]
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: Settings,
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"]
  },
];
