
// Função para determinar o nome do papel com base no código do papel
export const getUserRoleName = (role: string): string => {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'lawyer':
      return 'Advogado';
    case 'senior_lawyer':
      return 'Advogado Sênior';
    case 'assistant':
      return 'Assistente';
    case 'client':
      return 'Cliente';
    default:
      return 'Utilizador';
  }
};

// Função para gerar dados de gráfico de exemplo
export const getChartData = () => {
  return [
    { month: 'Jan', processos: 5, documentos: 12 },
    { month: 'Fev', processos: 8, documentos: 15 },
    { month: 'Mar', processos: 12, documentos: 18 },
    { month: 'Abr', processos: 10, documentos: 22 },
    { month: 'Mai', processos: 14, documentos: 25 },
    { month: 'Jun', processos: 18, documentos: 30 },
  ];
};

// Função para gerar dados financeiros de exemplo
export const getFinancialData = () => {
  return [
    { month: 'Jan', receitas: 15000, despesas: 8000 },
    { month: 'Fev', receitas: 18000, despesas: 7500 },
    { month: 'Mar', receitas: 22000, despesas: 9000 },
    { month: 'Abr', receitas: 19000, despesas: 8500 },
    { month: 'Mai', receitas: 24000, despesas: 10000 },
    { month: 'Jun', receitas: 28000, despesas: 11000 },
  ];
};

// Função para gerar dados de desempenho de exemplo
export const getPerformanceData = () => {
  return [
    { dia: 'Seg', concluidas: 5, pendentes: 3 },
    { dia: 'Ter', concluidas: 7, pendentes: 2 },
    { dia: 'Qua', concluidas: 4, pendentes: 4 },
    { dia: 'Qui', concluidas: 6, pendentes: 2 },
    { dia: 'Sex', concluidas: 9, pendentes: 1 },
  ];
};

// Função para gerar estatísticas gerais
export const getStatisticsData = () => {
  return {
    activeProcesses: 24,
    pendingDocuments: 15,
    completedCases: 42,
    averageResolutionTime: 45
  };
};
