
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
import { USER_ROLES } from "@/constants/userRoles";

export interface SidebarItem {
  name: string;
  href: string;
  icon: ComponentType<any>;
  items?: SidebarSubItem[];
  roles?: string[];
}

interface SidebarSubItem {
  name: string;
  href: string;
  roles?: string[];
}

export const sidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER, USER_ROLES.ASSISTANT, USER_ROLES.CLIENT]
  },
  {
    name: "Processos",
    href: "/processes",
    icon: Briefcase,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER, USER_ROLES.ASSISTANT, USER_ROLES.CLIENT]
  },
  {
    name: "Clientes",
    href: "/clients",
    icon: Users,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER, USER_ROLES.ASSISTANT]
  },
  {
    name: "Documentos",
    href: "/documents",
    icon: FileText,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER, USER_ROLES.ASSISTANT, USER_ROLES.CLIENT]
  },
  {
    name: "Calendário",
    href: "/calendar",
    icon: Calendar,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER, USER_ROLES.ASSISTANT, USER_ROLES.CLIENT]
  },
  {
    name: "Mensagens",
    href: "/messages",
    icon: MessageSquare,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER, USER_ROLES.ASSISTANT, USER_ROLES.CLIENT]
  },
  {
    name: "Financeiro",
    href: "/financial",
    icon: DollarSign,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER]
  },
  {
    name: "Links Úteis",
    href: "/useful-links",
    icon: Link,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER, USER_ROLES.ASSISTANT, USER_ROLES.CLIENT]
  },
  {
    name: "Central de Ajuda",
    href: "/help-center",
    icon: HelpCircle,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER, USER_ROLES.ASSISTANT, USER_ROLES.CLIENT]
  },
  {
    name: "Configurações",
    href: "/settings",
    icon: Settings,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER, USER_ROLES.ASSISTANT, USER_ROLES.CLIENT]
  },
];

export const userMenuItems = [
  {
    label: "Perfil",
    href: "/profile",
    icon: User,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER, USER_ROLES.ASSISTANT, USER_ROLES.CLIENT]
  },
  {
    label: "Assinaturas",
    href: "/subscriptions",
    icon: CreditCard,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER]
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: Settings,
    roles: [USER_ROLES.ADMIN, USER_ROLES.LAWYER, USER_ROLES.SENIOR_LAWYER, USER_ROLES.ASSISTANT, USER_ROLES.CLIENT]
  },
];
