
import { 
  LayoutDashboard, Briefcase, Users, Calendar, MessageSquare, 
  Settings, DollarSign, CheckSquare, UserPlus, CreditCard, FileText, User, BarChart2
} from "lucide-react";
import { SidebarItem } from "./SidebarItems";

// Itens que aparecem no menu lateral
export const sidebarItems: SidebarItem[] = [
  {
    label: "Painel",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"],
  },
  {
    label: "Processos",
    icon: Briefcase,
    href: "/processes",
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
    label: "Análise de Dados",
    icon: BarChart2,
    href: "/analytics",
    roles: ["admin", "lawyer", "senior_lawyer"],
  },
  {
    label: "Links Úteis",
    icon: FileText,
    href: "/useful-links",
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"],
  },
];

// Itens que aparecem no dropdown do usuário
export const userMenuItems: SidebarItem[] = [
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
  {
    label: "Perfil",
    icon: User,
    href: "/profile",
    roles: ["admin", "lawyer", "senior_lawyer", "assistant", "client"],
  },
];
