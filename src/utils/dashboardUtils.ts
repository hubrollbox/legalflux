
import { UserRole } from "@/types";

/**
 * Get a user-friendly name for the user role
 */
export const getUserRoleName = (role: UserRole): string => {
  switch (role) {
    case UserRole.CLIENT:
      return "Cliente";
    case UserRole.LAWYER:
      return "Advogado";
    case UserRole.SENIOR_LAWYER:
      return "Advogado Sénior";
    case UserRole.ASSISTANT:
      return "Assistente";
    case UserRole.ADMIN:
      return "Administrador";
    default:
      return "Utilizador";
  }
};

/**
 * Get chart data for the dashboard
 */
export const getChartData = () => {
  return {
    casesByMonth: [
      { month: "Jan", count: 10 },
      { month: "Fev", count: 15 },
      { month: "Mar", count: 8 },
      { month: "Abr", count: 12 },
      { month: "Mai", count: 19 },
      { month: "Jun", count: 14 },
    ],
    casesByType: [
      { type: "Cível", count: 35 },
      { type: "Família", count: 25 },
      { type: "Trabalhista", count: 20 },
      { type: "Criminal", count: 10 },
      { type: "Tributário", count: 10 },
    ],
  };
};

/**
 * Get financial data for the dashboard
 */
export const getFinancialData = () => {
  return {
    revenue: {
      total: 35000,
      pending: 8000,
      overdue: 2000,
    },
    revenueByMonth: [
      { month: "Jan", value: 12000 },
      { month: "Fev", value: 15000 },
      { month: "Mar", value: 10000 },
      { month: "Abr", value: 18000 },
      { month: "Mai", value: 20000 },
      { month: "Jun", value: 17000 },
    ],
  };
};

/**
 * Get performance data for the dashboard
 */
export const getPerformanceData = () => {
  return {
    completionRate: 85,
    tasksByStatus: {
      todo: 12,
      inProgress: 8,
      review: 5,
      done: 25,
    },
    averageResolutionTime: 18, // in days
  };
};

/**
 * Get statistics data for the dashboard
 */
export const getStatisticsData = () => {
  return {
    activeCases: 48,
    pendingTasks: 25,
    upcomingDeadlines: 7,
    clientSatisfaction: 4.7,
  };
};
