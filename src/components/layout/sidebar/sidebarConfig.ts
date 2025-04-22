
import { 
  LayoutDashboard, Briefcase, Users, Calendar, MessageSquare, 
  Settings, DollarSign, CheckSquare, UserPlus, CreditCard, FileText, User, BarChart2, BookOpen
} from "lucide-react";
import type { SidebarItem } from "./SidebarItems";
import { UserRole } from "@/types/permissions"; // <-- Add this import

// Itens que aparecem no menu lateral
export const sidebarItems: SidebarItem[] = [
  {
    label: "Painel",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT],
  },
  {
    label: "Processos",
    icon: Briefcase,
    href: "/processes",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT],
  },
  {
    label: "Tarefas",
    icon: CheckSquare,
    href: "/tasks",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT],
  },
  {
    label: "Documentos",
    icon: FileText,
    href: "/documents",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT],
  },
  {
    label: "Onboarding",
    icon: BookOpen,
    href: "/onboarding",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT],
  },
  {
    label: "Clientes",
    icon: Users,
    href: "/clients",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER],
  },
  {
    label: "Agenda",
    icon: Calendar,
    href: "/calendar",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT],
  },
  {
    label: "Mensagens",
    icon: MessageSquare,
    href: "/messages",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT],
  },
  {
    label: "Financeiro",
    icon: DollarSign,
    href: "/financial",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.CLIENT],
  },
  {
    label: "Análise de Dados",
    icon: BarChart2,
    href: "/analytics",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER],
  },
  {
    label: "Links Úteis",
    icon: FileText,
    href: "/useful-links",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT],
  },
];

// Itens que aparecem no dropdown do usuário
export const userMenuItems: SidebarItem[] = [
  {
    label: "Utilizadores",
    icon: UserPlus,
    href: "/users",
    roles: [UserRole.ADMIN, UserRole.SENIOR_LAWYER],
  },
  {
    label: "Assinaturas",
    icon: CreditCard,
    href: "/subscriptions",
    roles: [UserRole.ADMIN, UserRole.SENIOR_LAWYER],
  },
  {
    label: "Configurações",
    icon: Settings,
    href: "/settings",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT],
  },
  {
    label: "Perfil",
    icon: User,
    href: "/profile",
    roles: [UserRole.ADMIN, UserRole.LAWYER, UserRole.SENIOR_LAWYER, UserRole.ASSISTANT, UserRole.CLIENT],
  },
];
