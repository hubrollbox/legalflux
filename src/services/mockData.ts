
// Dados simulados para casos recentes
export function getRecentCases() {
  return [
    {
      id: "case-001",
      title: "Silva vs. Empresa ABC",
      status: "ativo",
      date: "2023-05-01",
      type: "Trabalhista"
    },
    {
      id: "case-002",
      title: "Disputa de Propriedade",
      status: "pendente",
      date: "2023-04-28",
      type: "Cível"
    },
    {
      id: "case-003",
      title: "Processo de Herança",
      status: "ativo",
      date: "2023-04-25",
      type: "Família"
    },
    {
      id: "case-004",
      title: "Recurso Tributário",
      status: "ativo",
      date: "2023-04-20",
      type: "Tributário"
    },
    {
      id: "case-005",
      title: "Ação de Indenização",
      status: "concluído",
      date: "2023-04-15",
      type: "Cível"
    }
  ];
}

// Dados simulados para tarefas recentes
export function getRecentTasks() {
  return [
    {
      id: "task-001",
      title: "Preparar contestação",
      deadline: "2023-05-10",
      priority: "alta",
      assignedTo: "João Silva"
    },
    {
      id: "task-002",
      title: "Revisar contrato",
      deadline: "2023-05-08",
      priority: "média",
      assignedTo: "Maria Costa"
    },
    {
      id: "task-003",
      title: "Agendar reunião com cliente",
      deadline: "2023-05-05",
      priority: "baixa",
      assignedTo: "Ana Pereira"
    },
    {
      id: "task-004",
      title: "Preparar audiência",
      deadline: "2023-05-15",
      priority: "alta",
      assignedTo: "Carlos Santos"
    },
    {
      id: "task-005",
      title: "Enviar notificação",
      deadline: "2023-05-07",
      priority: "média",
      assignedTo: "Pedro Alves"
    }
  ];
}
