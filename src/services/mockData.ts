
import { 
  Case, 
  Document, 
  Task, 
  Message, 
  FinancialTransaction,
  Organization,
  Subscription,
  SubscriptionFeature
} from "@/types";

export const MOCK_CASES: Case[] = [
  {
    id: "1",
    title: "Processo de Divórcio Silva",
    clientId: "3",
    clientName: "Cliente Demo",
    assignedLawyerId: "2",
    assignedLawyerName: "Advogado Demo",
    status: "active",
    createdAt: "2023-10-15T10:30:00Z",
    updatedAt: "2023-10-25T14:20:00Z",
    dueDate: "2023-12-30T23:59:59Z",
    priority: "high",
    description: "Divórcio litigioso com disputa de guarda de menores.",
  },
  {
    id: "2",
    title: "Contrato Imobiliário Martins",
    clientId: "3",
    clientName: "Cliente Demo",
    assignedLawyerId: "2",
    assignedLawyerName: "Advogado Demo",
    status: "pending",
    createdAt: "2023-09-05T09:15:00Z",
    updatedAt: "2023-09-20T11:45:00Z",
    dueDate: "2023-11-15T23:59:59Z",
    priority: "medium",
    description: "Revisão de contrato de compra e venda de imóvel residencial.",
  },
  {
    id: "3",
    title: "Processo Trabalhista Santos",
    clientId: "6",
    clientName: "Pedro Santos",
    assignedLawyerId: "4",
    assignedLawyerName: "Advogado Sênior Demo",
    status: "active",
    createdAt: "2023-08-20T14:00:00Z",
    updatedAt: "2023-10-12T16:30:00Z",
    dueDate: "2024-01-20T23:59:59Z",
    priority: "high",
    description: "Ação trabalhista por demissão sem justa causa.",
  },
  {
    id: "4",
    title: "Registro de Marca Costa",
    clientId: "7",
    clientName: "Mariana Costa",
    assignedLawyerId: "2",
    assignedLawyerName: "Advogado Demo",
    status: "closed",
    createdAt: "2023-05-10T11:00:00Z",
    updatedAt: "2023-09-30T09:45:00Z",
    priority: "low",
    description: "Registro de marca comercial para empresa de cosméticos.",
  },
  {
    id: "5",
    title: "Recurso Tributário Oliveira",
    clientId: "8",
    clientName: "Empresa Oliveira Ltda.",
    assignedLawyerId: "4",
    assignedLawyerName: "Advogado Sênior Demo",
    status: "active",
    createdAt: "2023-07-25T16:20:00Z",
    updatedAt: "2023-10-18T10:10:00Z",
    dueDate: "2023-11-30T23:59:59Z",
    priority: "high",
    description: "Recurso contra autuação fiscal municipal.",
  }
];

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Petição Inicial - Divórcio Silva.pdf",
    caseId: "1",
    createdAt: "2023-10-15T11:00:00Z",
    updatedAt: "2023-10-15T11:00:00Z",
    createdBy: "2",
    size: 2456789,
    type: "application/pdf",
    url: "/documents/petition.pdf",
    version: 1,
  },
  {
    id: "2",
    name: "Certidão de Casamento - Silva.pdf",
    caseId: "1",
    createdAt: "2023-10-16T09:30:00Z",
    updatedAt: "2023-10-16T09:30:00Z",
    createdBy: "3",
    size: 1234567,
    type: "application/pdf",
    url: "/documents/certificate.pdf",
    version: 1,
  },
  {
    id: "3",
    name: "Contrato Imobiliário - Versão Final.docx",
    caseId: "2",
    createdAt: "2023-09-18T14:20:00Z",
    updatedAt: "2023-09-19T10:15:00Z",
    createdBy: "2",
    size: 3567890,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    url: "/documents/contract.docx",
    version: 3,
  },
  {
    id: "4",
    name: "Carteira de Trabalho - Santos.pdf",
    caseId: "3",
    createdAt: "2023-08-25T11:40:00Z",
    updatedAt: "2023-08-25T11:40:00Z",
    createdBy: "4",
    size: 1987654,
    type: "application/pdf",
    url: "/documents/workcard.pdf",
    version: 1,
  },
  {
    id: "5",
    name: "Procuração - Oliveira.pdf",
    caseId: "5",
    createdAt: "2023-07-26T09:10:00Z",
    updatedAt: "2023-07-26T09:10:00Z",
    createdBy: "4",
    size: 987654,
    type: "application/pdf",
    url: "/documents/power_of_attorney.pdf",
    version: 1,
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Preparar petição inicial",
    description: "Redigir a petição inicial do processo de divórcio Silva.",
    caseId: "1",
    caseName: "Processo de Divórcio Silva",
    assignedToId: "2",
    assignedToName: "Advogado Demo",
    assignedById: "4",
    assignedByName: "Advogado Sênior Demo",
    status: "done",
    priority: "high",
    dueDate: "2023-10-20T23:59:59Z",
    createdAt: "2023-10-16T09:00:00Z",
    updatedAt: "2023-10-19T16:30:00Z",
  },
  {
    id: "2",
    title: "Coletar documentos do cliente",
    description: "Solicitar e organizar todos os documentos necessários para o processo.",
    caseId: "1",
    caseName: "Processo de Divórcio Silva",
    assignedToId: "5",
    assignedToName: "Assistente Demo",
    assignedById: "2",
    assignedByName: "Advogado Demo",
    status: "in_progress",
    priority: "medium",
    dueDate: "2023-10-25T23:59:59Z",
    createdAt: "2023-10-16T09:15:00Z",
    updatedAt: "2023-10-20T11:20:00Z",
  },
  {
    id: "3",
    title: "Revisar contrato imobiliário",
    description: "Fazer uma revisão detalhada do contrato de compra e venda.",
    caseId: "2",
    caseName: "Contrato Imobiliário Martins",
    assignedToId: "2",
    assignedToName: "Advogado Demo",
    assignedById: "4",
    assignedByName: "Advogado Sênior Demo",
    status: "todo",
    priority: "medium",
    dueDate: "2023-11-05T23:59:59Z",
    createdAt: "2023-09-10T14:00:00Z",
    updatedAt: "2023-09-10T14:00:00Z",
  },
  {
    id: "4",
    title: "Entrevistar testemunhas",
    description: "Agendar e realizar entrevistas com as testemunhas do caso trabalhista.",
    caseId: "3",
    caseName: "Processo Trabalhista Santos",
    assignedToId: "4",
    assignedToName: "Advogado Sênior Demo",
    assignedById: "4",
    assignedByName: "Advogado Sênior Demo",
    status: "todo",
    priority: "high",
    dueDate: "2023-11-10T23:59:59Z",
    createdAt: "2023-10-15T10:00:00Z",
    updatedAt: "2023-10-15T10:00:00Z",
  },
  {
    id: "5",
    title: "Preparar recurso tributário",
    description: "Elaborar o recurso contra a autuação fiscal.",
    caseId: "5",
    caseName: "Recurso Tributário Oliveira",
    assignedToId: "4",
    assignedToName: "Advogado Sênior Demo",
    assignedById: "4",
    assignedByName: "Advogado Sênior Demo",
    status: "in_progress",
    priority: "high",
    dueDate: "2023-11-25T23:59:59Z",
    createdAt: "2023-10-01T11:30:00Z",
    updatedAt: "2023-10-18T15:45:00Z",
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Preciso que você me envie os documentos do divórcio até amanhã.",
    senderId: "2",
    senderName: "Advogado Demo",
    senderRole: "lawyer",
    receiverId: "3",
    receiverName: "Cliente Demo",
    caseId: "1",
    readAt: "2023-10-17T15:10:00Z",
    createdAt: "2023-10-17T14:30:00Z",
  },
  {
    id: "2",
    content: "Vou enviar os documentos ainda hoje. Tenho algumas dúvidas sobre o processo.",
    senderId: "3",
    senderName: "Cliente Demo",
    senderRole: "client",
    receiverId: "2",
    receiverName: "Advogado Demo",
    caseId: "1",
    readAt: "2023-10-17T15:45:00Z",
    createdAt: "2023-10-17T15:40:00Z",
  },
  {
    id: "3",
    content: "Podemos marcar uma reunião para discutir suas dúvidas?",
    senderId: "2",
    senderName: "Advogado Demo",
    senderRole: "lawyer",
    receiverId: "3",
    receiverName: "Cliente Demo",
    caseId: "1",
    createdAt: "2023-10-17T16:00:00Z",
  },
  {
    id: "4",
    content: "Precisamos discutir a estratégia para o caso trabalhista.",
    senderId: "4",
    senderName: "Advogado Sênior Demo",
    senderRole: "senior_lawyer",
    receiverId: "2",
    receiverName: "Advogado Demo",
    caseId: "3",
    readAt: "2023-10-18T09:15:00Z",
    createdAt: "2023-10-18T09:00:00Z",
  },
  {
    id: "5",
    content: "A revisão do contrato imobiliário está quase finalizada. Enviarei até o final do dia.",
    senderId: "2",
    senderName: "Advogado Demo",
    senderRole: "lawyer",
    receiverId: "3",
    receiverName: "Cliente Demo",
    caseId: "2",
    createdAt: "2023-10-19T11:30:00Z",
  }
];

export const MOCK_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: "1",
    clientId: "3",
    clientName: "Cliente Demo",
    caseId: "1",
    caseName: "Processo de Divórcio Silva",
    amount: 2500,
    currency: "EUR",
    type: "invoice",
    status: "pending",
    date: "2023-10-16T00:00:00Z",
    description: "Honorários iniciais - Processo de divórcio",
  },
  {
    id: "2",
    clientId: "3",
    clientName: "Cliente Demo",
    caseId: "2",
    caseName: "Contrato Imobiliário Martins",
    amount: 1200,
    currency: "EUR",
    type: "payment",
    status: "completed",
    date: "2023-09-10T00:00:00Z",
    description: "Pagamento de honorários - Revisão de contrato",
  },
  {
    id: "3",
    clientId: "6",
    clientName: "Pedro Santos",
    caseId: "3",
    caseName: "Processo Trabalhista Santos",
    amount: 3000,
    currency: "EUR",
    type: "invoice",
    status: "completed",
    date: "2023-08-25T00:00:00Z",
    description: "Honorários iniciais - Processo trabalhista",
  },
  {
    id: "4",
    clientId: "7",
    clientName: "Mariana Costa",
    caseId: "4",
    caseName: "Registro de Marca Costa",
    amount: 1500,
    currency: "EUR",
    type: "invoice",
    status: "completed",
    date: "2023-05-15T00:00:00Z",
    description: "Honorários - Registro de marca",
  },
  {
    id: "5",
    clientId: "8",
    clientName: "Empresa Oliveira Ltda.",
    caseId: "5",
    caseName: "Recurso Tributário Oliveira",
    amount: 4500,
    currency: "EUR",
    type: "payment",
    status: "completed",
    date: "2023-07-30T00:00:00Z",
    description: "Pagamento de honorários - Recurso tributário",
  },
  {
    id: "6",
    clientId: "3",
    clientName: "Cliente Demo",
    amount: 49,
    currency: "EUR",
    type: "subscription",
    status: "completed",
    date: "2023-10-01T00:00:00Z",
    description: "Assinatura mensal - Plano Basic",
  }
];

export const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: "1",
    name: "Escritório de Advocacia Demo",
    plan: "enterprise",
    isActive: true,
    createdAt: "2023-01-15T10:00:00Z",
    memberCount: 5,
    ownerId: "4",
  }
];

export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "1",
    plan: "enterprise",
    status: "active",
    currentPeriodEnd: "2023-11-30T23:59:59Z",
    createdAt: "2023-01-15T10:00:00Z",
    priceId: "price_enterprise",
    price: 199,
    currency: "EUR",
    usersLimit: 10,
    features: [
      {
        id: "1",
        name: "Utilizadores",
        description: "Até 10 utilizadores",
        included: true,
      },
      {
        id: "2",
        name: "Gestão de Processos",
        description: "Funcionalidades avançadas de gestão de processos",
        included: true,
      },
      {
        id: "3",
        name: "Portal do Cliente",
        description: "Portal personalizado para clientes",
        included: true,
      },
      {
        id: "4",
        name: "Armazenamento",
        description: "50GB de armazenamento para documentos",
        included: true,
      },
      {
        id: "5",
        name: "Gestão de Tarefas",
        description: "Ferramentas avançadas de gestão de tarefas",
        included: true,
      },
      {
        id: "6",
        name: "Agendamento Online",
        description: "Sistema de agendamento online para clientes",
        included: true,
      },
      {
        id: "7",
        name: "Automatização",
        description: "Ferramentas de automatização de documentos",
        included: true,
      },
      {
        id: "8",
        name: "Relatórios",
        description: "Relatórios e analytics avançados",
        included: true,
      },
      {
        id: "9",
        name: "API",
        description: "Acesso à API para integrações personalizadas",
        included: true,
      },
    ]
  }
];

// Helper function to filter cases by user
export const getCasesByUser = (userId: string, userRole: string): Case[] => {
  if (userRole === "admin" || userRole === "senior_lawyer") {
    return MOCK_CASES;
  } else if (userRole === "lawyer") {
    return MOCK_CASES.filter(c => c.assignedLawyerId === userId);
  } else if (userRole === "client") {
    return MOCK_CASES.filter(c => c.clientId === userId);
  } else if (userRole === "assistant") {
    // Assistants can see cases assigned to the lawyer they support
    // In a real app, this would be more complex with a relation between assistant and lawyer
    return MOCK_CASES.filter(c => c.assignedLawyerId === "2"); // For demo, assume assisting Lawyer Demo
  }
  return [];
};

// Helper function to filter tasks by user
export const getTasksByUser = (userId: string, userRole: string): Task[] => {
  if (userRole === "admin" || userRole === "senior_lawyer") {
    return MOCK_TASKS;
  } else if (userRole === "lawyer" || userRole === "assistant") {
    return MOCK_TASKS.filter(t => t.assignedToId === userId);
  }
  // Clients don't see tasks
  return [];
};

// Helper function to filter documents by user and case
export const getDocumentsByCase = (caseId: string): Document[] => {
  return MOCK_DOCUMENTS.filter(d => d.caseId === caseId);
};

// Helper function to get documents accessible to a user
export const getDocumentsByUser = (userId: string, userRole: string): Document[] => {
  if (userRole === "admin" || userRole === "senior_lawyer") {
    return MOCK_DOCUMENTS;
  } else if (userRole === "lawyer" || userRole === "assistant") {
    // Get cases assigned to this lawyer/assistant
    const cases = getCasesByUser(userId, userRole);
    const caseIds = cases.map(c => c.id);
    return MOCK_DOCUMENTS.filter(d => d.caseId && caseIds.includes(d.caseId));
  } else if (userRole === "client") {
    // Get cases for this client
    const cases = getCasesByUser(userId, userRole);
    const caseIds = cases.map(c => c.id);
    return MOCK_DOCUMENTS.filter(d => d.caseId && caseIds.includes(d.caseId));
  }
  return [];
};

// Helper function to get messages for a user
export const getMessagesByUser = (userId: string): Message[] => {
  return MOCK_MESSAGES.filter(m => 
    m.senderId === userId || m.receiverId === userId
  ).sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Helper function to get messages for a specific case
export const getMessagesByCase = (caseId: string): Message[] => {
  return MOCK_MESSAGES.filter(m => m.caseId === caseId)
    .sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
};

// Helper function to get financial transactions for a user
export const getTransactionsByUser = (userId: string, userRole: string): FinancialTransaction[] => {
  if (userRole === "admin" || userRole === "senior_lawyer") {
    return MOCK_TRANSACTIONS;
  } else if (userRole === "lawyer") {
    // Get cases assigned to this lawyer
    const cases = getCasesByUser(userId, userRole);
    const caseIds = cases.map(c => c.id);
    return MOCK_TRANSACTIONS.filter(t => !t.caseId || caseIds.includes(t.caseId));
  } else if (userRole === "client") {
    return MOCK_TRANSACTIONS.filter(t => t.clientId === userId);
  }
  // Assistants don't see financial info by default
  return [];
};

// Helper function to get financial transactions for a specific case
export const getTransactionsByCase = (caseId: string): FinancialTransaction[] => {
  return MOCK_TRANSACTIONS.filter(t => t.caseId === caseId);
};

// Helper function to get organization by id
export const getOrganizationById = (orgId: string): Organization | undefined => {
  return MOCK_ORGANIZATIONS.find(o => o.id === orgId);
};

// Helper function to get subscription by organization id
export const getSubscriptionByOrgId = (orgId: string): Subscription | undefined => {
  const org = MOCK_ORGANIZATIONS.find(o => o.id === orgId);
  if (!org) return undefined;
  
  return MOCK_SUBSCRIPTIONS.find(s => s.plan === org.plan);
};
