
export function getUserRoleName(role: string): string {
  const roles: Record<string, string> = {
    admin: "Administrador",
    lawyer: "Advogado",
    senior_lawyer: "Advogado Sênior",
    client: "Cliente",
    assistant: "Assistente"
  };

  return roles[role] || role;
}

export function getChartData() {
  // Dados simulados para gráficos do dashboard
  return {
    processos: [
      { month: "Jan", value: 5 },
      { month: "Fev", value: 8 },
      { month: "Mar", value: 12 },
      { month: "Abr", value: 10 },
      { month: "Mai", value: 15 },
      { month: "Jun", value: 18 }
    ],
    faturamento: [
      { month: "Jan", value: 2500 },
      { month: "Fev", value: 3800 },
      { month: "Mar", value: 5000 },
      { month: "Abr", value: 4500 },
      { month: "Mai", value: 6200 },
      { month: "Jun", value: 7500 }
    ]
  };
}

export function getFinancialData() {
  // Dados financeiros simulados
  return {
    totalFaturado: 29500,
    pendente: 4800,
    recebido: 24700,
    previsao: 35000
  };
}

export function getPerformanceData() {
  // Dados de desempenho simulados
  return {
    processosAtivos: 42,
    tarefasPendentes: 18,
    audienciasMes: 7,
    prazosMes: 12
  };
}

export function getStatisticsData() {
  // Estatísticas gerais simuladas
  return {
    clientesAtivos: 28,
    processosGanhos: 67,
    processosPerdidos: 12,
    taxaSucesso: 85 // porcentagem
  };
}
