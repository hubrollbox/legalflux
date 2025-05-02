
import { UserRole } from "../hooks/useAuth";
import { PriorityLevel } from "../types/priority-level";

export const getDefaultPermissions = (role: UserRole) => {
  switch (role) {
    case UserRole.ADMIN:
      return {
        canCreateCase: true,
        canEditCase: true,
        canDeleteCase: true,
        canAssignCase: true,
        canViewAllCases: true,
        canViewReports: true,
        canManageUsers: true,
        canAccessBilling: true,
      };
    case UserRole.SENIOR_LAWYER:
      return {
        canCreateCase: true,
        canEditCase: true,
        canDeleteCase: false,
        canAssignCase: true,
        canViewAllCases: true,
        canViewReports: true,
        canManageUsers: false,
        canAccessBilling: true,
      };
    case UserRole.LAWYER:
      return {
        canCreateCase: true,
        canEditCase: true,
        canDeleteCase: false,
        canAssignCase: false,
        canViewAllCases: false,
        canViewReports: false,
        canManageUsers: false,
        canAccessBilling: false,
      };
    case UserRole.ASSISTANT:
      return {
        canCreateCase: false,
        canEditCase: true,
        canDeleteCase: false,
        canAssignCase: false,
        canViewAllCases: false,
        canViewReports: false,
        canManageUsers: false,
        canAccessBilling: false,
      };
    case UserRole.CLIENT:
      return {
        canCreateCase: false,
        canEditCase: false,
        canDeleteCase: false,
        canAssignCase: false,
        canViewAllCases: false,
        canViewReports: false,
        canManageUsers: false,
        canAccessBilling: false,
      };
    default:
      return {
        canCreateCase: false,
        canEditCase: false,
        canDeleteCase: false,
        canAssignCase: false,
        canViewAllCases: false,
        canViewReports: false,
        canManageUsers: false,
        canAccessBilling: false,
      };
  }
};

export const getPriorityColor = (priority: PriorityLevel) => {
  switch (priority) {
    case PriorityLevel.HIGH:
      return 'bg-red-100 text-red-800';
    case PriorityLevel.MEDIUM:
      return 'bg-yellow-100 text-yellow-800';
    case PriorityLevel.LOW:
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function getUserRoleName(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return "Administrador";
    case UserRole.SENIOR_LAWYER:
      return "Advogado Sénior";
    case UserRole.LAWYER:
      return "Advogado";
    case UserRole.ASSISTANT:
      return "Assistente";
    case UserRole.CLIENT:
      return "Cliente";
    default:
      return "Utilizador";
  }
}

// Functions needed by Dashboard.tsx
export const getChartData = () => {
  return [
    { name: 'Jan', value: 400 },
    { name: 'Fev', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Abr', value: 800 },
    { name: 'Mai', value: 500 },
    { name: 'Jun', value: 350 },
    { name: 'Jul', value: 670 }
  ];
};

export const getFinancialData = () => {
  return [
    { name: 'Jan', revenue: 4000, expenses: 2400 },
    { name: 'Fev', revenue: 3000, expenses: 1398 },
    { name: 'Mar', revenue: 2000, expenses: 9800 },
    { name: 'Abr', revenue: 2780, expenses: 3908 },
    { name: 'Mai', revenue: 1890, expenses: 4800 },
    { name: 'Jun', revenue: 2390, expenses: 3800 },
    { name: 'Jul', revenue: 3490, expenses: 4300 }
  ];
};

export const getPerformanceData = () => {
  return [
    { name: 'Processos', value: 78 },
    { name: 'Audiências', value: 45 },
    { name: 'Prazos', value: 35 },
    { name: 'Horas', value: 122 }
  ];
};

export const getStatisticsData = () => {
  return {
    activeProcesses: 24,
    pendingDocuments: 12,
    completedCases: 32,
    averageResolutionTime: 45
  };
};
