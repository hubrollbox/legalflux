
export const getRecentCases = () => {
  return [
    {
      id: "c1",
      title: "Processo Trabalhista - Empresa XYZ",
      status: "active",
      client: "João Silva",
      date: "Hoje, 10:30",
      action: "Novo Documento Adicionado"
    },
    {
      id: "c2",
      title: "Ação de Despejo - Imóvel Comercial",
      status: "pending",
      client: "Maria Oliveira",
      date: "Hoje, 09:15",
      action: "Atualização de Status"
    },
    {
      id: "c3",
      title: "Recurso Administrativo - Licença de Funcionamento",
      status: "active",
      client: "Empresa ABC",
      date: "Ontem, 14:20",
      action: "Prazo Atualizado"
    }
  ];
};

export const getRecentTasks = () => {
  return [
    {
      id: "t1",
      title: "Preparar contestação",
      deadline: "Hoje, 18:00",
      priority: "high",
      assigned: "Você"
    },
    {
      id: "t2",
      title: "Revisar contrato de prestação de serviços",
      deadline: "Amanhã, 12:00",
      priority: "medium",
      assigned: "Ana Costa"
    },
    {
      id: "t3",
      title: "Contactar cliente para obter documentos adicionais",
      deadline: "25/05/2023",
      priority: "low",
      assigned: "Carlos Santos"
    }
  ];
};
