
export const getRecentCases = () => {
  return [
    {
      id: '1',
      title: 'Processo 12345/2023',
      date: new Date(2023, 6, 15),
      client: 'João Silva',
      status: 'ativo'
    },
    {
      id: '2',
      title: 'Processo 23456/2023',
      date: new Date(2023, 6, 10),
      client: 'Maria Oliveira',
      status: 'pendente'
    },
    {
      id: '3',
      title: 'Processo 34567/2023',
      date: new Date(2023, 6, 5),
      client: 'António Santos',
      status: 'concluído'
    }
  ];
};

export const getRecentTasks = () => {
  return [
    {
      id: '1',
      title: 'Revisão de contrato',
      dueDate: new Date(2023, 6, 20),
      priority: 'alta',
      assignee: 'Manuel Costa'
    },
    {
      id: '2',
      title: 'Preparar audiência',
      dueDate: new Date(2023, 6, 18),
      priority: 'alta',
      assignee: 'Ana Ferreira'
    },
    {
      id: '3',
      title: 'Submeter documentos',
      dueDate: new Date(2023, 6, 25),
      priority: 'média',
      assignee: 'Carlos Rodrigues'
    }
  ];
};

export const tasks = [
  {
    id: '1',
    title: 'Revisão de contrato',
    dueDate: new Date(2023, 6, 20),
    priority: 'alta',
    assignee: 'Manuel Costa'
  },
  {
    id: '2',
    title: 'Preparar audiência',
    dueDate: new Date(2023, 6, 18),
    priority: 'alta',
    assignee: 'Ana Ferreira'
  },
  {
    id: '3',
    title: 'Submeter documentos',
    dueDate: new Date(2023, 6, 25),
    priority: 'média',
    assignee: 'Carlos Rodrigues'
  }
];
