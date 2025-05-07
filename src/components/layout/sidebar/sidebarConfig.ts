
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
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT]
  },
  {
    name: "Documentos",
    href: "/documents",
    icon: FileText,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT]
  },
  {
    name: "Calendário",
    href: "/calendar",
    icon: Calendar,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT]
  },
  {
    name: "Mensagens",
    href: "/messages",
    icon: MessageSquare,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT]
  },
  {
    name: "Financeiro",
    href: "/financial",
    icon: DollarSign,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER]
  },
  {
    name: "Links Úteis",
    href: "/useful-links",
    icon: Link,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT]
  },
  {
    name: "Central de Ajuda",
    href: "/help-center",
    icon: HelpCircle,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT]
  },
  {
    name: "Configurações",
    href: "/settings",
    icon: Settings,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT]
  },
];

export const userMenuItems = [
  {
    label: "Perfil",
    href: "/profile",
    icon: User,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT]
  },
  {
    label: "Assinaturas",
    href: "/subscriptions",
    icon: CreditCard,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER]
  },
  {
    label: "Configurações",
    href: "/settings",
    icon: Settings,
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT]
  },
];
