
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
  LogOut
} from "lucide-react";
import { ComponentType } from "react";

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
  },
  {
    name: "Processos",
    href: "/processes",
    icon: Briefcase,
  },
  {
    name: "Clientes",
    href: "/clients",
    icon: Users,
  },
  {
    name: "Documentos",
    href: "/documents",
    icon: FileText,
  },
  {
    name: "Calendário",
    href: "/calendar",
    icon: Calendar,
  },
  {
    name: "Mensagens",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    name: "Financeiro",
    href: "/financial",
    icon: DollarSign,
  },
  {
    name: "Links Úteis",
    href: "/useful-links",
    icon: Link,
  },
  {
    name: "Central de Ajuda",
    href: "/help-center",
    icon: HelpCircle,
  },
  {
    name: "Configurações",
    href: "/settings",
    icon: Settings,
  },
];
