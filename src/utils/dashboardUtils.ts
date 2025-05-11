
/**
 * Converts user role ID to a readable name
 * @param roleId The role ID from the user object
 * @returns A user-friendly role name
 */
export const getUserRoleName = (roleId: string): string => {
  const roles: Record<string, string> = {
    'admin': 'Administrador',
    'lawyer': 'Advogado',
    'senior_lawyer': 'Advogado Sênior',
    'assistant': 'Assistente',
    'client': 'Cliente'
  };
  
  return roles[roleId] || 'Utilizador';
};

/**
 * Generates mock chart data for dashboard
 * @returns Array of chart data points
 */
export const getChartData = () => {
  return [
    { name: 'Jan', cases: 12 },
    { name: 'Fev', cases: 19 },
    { name: 'Mar', cases: 7 },
    { name: 'Abr', cases: 15 },
    { name: 'Mai', cases: 10 },
    { name: 'Jun', cases: 8 }
  ];
};

/**
 * Generates mock financial data for dashboard charts
 * @returns Array of financial data points
 */
export const getFinancialData = () => {
  return [
    { name: 'Jan', revenue: 4000, expenses: 2400 },
    { name: 'Fev', revenue: 3000, expenses: 1398 },
    { name: 'Mar', revenue: 2000, expenses: 9800 },
    { name: 'Abr', revenue: 2780, expenses: 3908 },
    { name: 'Mai', revenue: 1890, expenses: 4800 },
    { name: 'Jun', revenue: 2390, expenses: 3800 },
    { name: 'Jul', revenue: 3490, expenses: 4300 },
  ];
};

/**
 * Generates mock performance data for dashboard
 * @returns Array of performance data points
 */
export const getPerformanceData = () => {
  return [
    { name: 'Seg', completed: 12, pending: 4 },
    { name: 'Ter', completed: 9, pending: 7 },
    { name: 'Qua', completed: 5, pending: 10 },
    { name: 'Qui', completed: 8, pending: 8 },
    { name: 'Sex', completed: 15, pending: 2 }
  ];
};

/**
 * Generates mock statistics data for dashboard
 * @returns Object with statistics values
 */
export const getStatisticsData = (processes: any[] = [], documents: any[] = []) => {
  return {
    activeProcesses: processes.filter(p => p.status === 'active').length || 12,
    pendingDocuments: documents.filter(d => d.status === 'pending').length || 8,
    completedCases: processes.filter(p => p.status === 'closed').length || 24,
    averageResolutionTime: 45
  };
};
