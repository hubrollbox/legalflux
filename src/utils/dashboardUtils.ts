
import { UserRole, PriorityLevel } from "@/types";

// Helper function to get user role name
export const getUserRoleName = (role: UserRole): string => {
  const roleNames: Record<UserRole, string> = {
    admin: "Administrador",
    lawyer: "Advogado",
    senior_lawyer: "Advogado Sênior",
    assistant: "Assistente",
    client: "Cliente",
  };
  return roleNames[role] || "Utilizador";
};

// Mock data functions that should be in mockData.ts
export const getChartData = () => [
  { name: "Jan", cases: 4 },
  { name: "Fev", cases: 7 },
  { name: "Mar", cases: 5 },
  { name: "Abr", cases: 8 },
  { name: "Mai", cases: 12 },
  { name: "Jun", cases: 10 },
];

export const getFinancialData = () => [
  { name: "Jan", revenue: 2500, expenses: 1200 },
  { name: "Fev", revenue: 3500, expenses: 1300 },
  { name: "Mar", revenue: 4200, expenses: 1400 },
  { name: "Abr", revenue: 3800, expenses: 1350 },
  { name: "Mai", revenue: 5200, expenses: 1500 },
  { name: "Jun", revenue: 6000, expenses: 1800 },
];

export const getPerformanceData = () => [
  { name: "Jan", completed: 10, pending: 5 },
  { name: "Fev", completed: 15, pending: 8 },
  { name: "Mar", completed: 20, pending: 6 },
  { name: "Abr", completed: 25, pending: 4 },
  { name: "Mai", completed: 30, pending: 5 },
  { name: "Jun", completed: 35, pending: 3 },
];

export const getStatisticsData = () => [
  {
    title: "Casos Ativos",
    value: "12",
    icon: "Briefcase",
    description: "+2 novos esta semana",
  },
  {
    title: "Tarefas Pendentes",
    value: "24",
    icon: "Clock",
    description: "5 com prazo a vencer",
  },
  {
    title: "Documentos",
    value: "45",
    icon: "FileText",
    description: "10 documentos recentes",
  },
  {
    title: "Clientes",
    value: "18",
    icon: "Users",
    description: "3 novos este mês",
  },
];
