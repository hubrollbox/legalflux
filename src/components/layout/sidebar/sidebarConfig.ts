
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
import { UserRoles } from "@/types/auth";
import { UserRole } from "@/types/auth";

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
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER, UserRoles.ASSISTANT, UserRoles.CLIENT]
  },
  {
    name: "Processos",
    href: "/processes",
    icon: Briefcase,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER, UserRoles.ASSISTANT, UserRoles.CLIENT]
  },
  {
    name: "Clientes",
    href: "/clients",
    icon: Users,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER, UserRoles.ASSISTANT]
  },
  {
    name: "Documentos",
    href: "/documents",
    icon: FileText,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER, UserRoles.ASSISTANT, UserRoles.CLIENT]
  },
  {
    name: "Calendário",
    href: "/calendar",
    icon: Calendar,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER, UserRoles.ASSISTANT, UserRoles.CLIENT]
  },
  {
    name: "Mensagens",
    href: "/messages",
    icon: MessageSquare,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER, UserRoles.ASSISTANT, UserRoles.CLIENT]
  },
  {
    name: "Financeiro",
    href: "/financial",
    icon: DollarSign,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER]
  },
  {
    name: "Links Úteis",
    href: "/useful-links",
    icon: Link,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER, UserRoles.ASSISTANT, UserRoles.CLIENT]
  },
  {
    name: "Central de Ajuda",
    href: "/help-center",
    icon: HelpCircle,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER, UserRoles.ASSISTANT, UserRoles.CLIENT]
  },
  {
    name: "Configurações",
    href: "/settings",
    icon: Settings,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER, UserRoles.ASSISTANT, UserRoles.CLIENT]
  },
];

export const userMenuItems = [
  {
    label: "Perfil",
    href: "/profile",
    icon: User,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER, UserRoles.ASSISTANT, UserRoles.CLIENT]
  },
  {
    label: "Assinaturas",
    href: "/subscriptions",
    icon: CreditCard,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER]
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: Settings,
    roles: [UserRoles.ADMIN, UserRoles.LAWYER, UserRoles.SENIOR_LAWYER, UserRoles.ASSISTANT, UserRoles.CLIENT]
  },
];