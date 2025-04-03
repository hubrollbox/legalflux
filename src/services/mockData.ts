import { User, Case, Task, Document, Message, FinancialTransaction, Organization, Subscription } from "@/types";

// Utilizadores simulados
export const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@legalflux.com",
    name: "Admin Demo",
    role: "admin",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    hasTwoFactorEnabled: true,
    organizationId: "1",
  },
  {
    id: "2",
    email: "lawyer@legalflux.com",
    name: "Advogado Demo",
    role: "lawyer",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    hasTwoFactorEnabled: false,
    organizationId: "1",
  },
  {
    id: "3",
    email: "client@legalflux.com",
    name: "Cliente Demo",
    role: "client",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    hasTwoFactorEnabled: false,
  },
  {
    id: "4",
    email: "senior@legalflux.com",
    name: "Advogado Sênior Demo",
    role: "senior_lawyer",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    hasTwoFactorEnabled: false,
    organizationId: "1",
  },
  {
    id: "5",
    email: "assistant@legalflux.com",
    name: "Assistente Demo",
    role: "assistant",
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    hasTwoFactorEnabled: false,
    organizationId: "1",
  },
  {
    id: "6",
    email: "pedro@legalflux.com",
    name: "Pedro Silva",
    role: "lawyer",
    isActive: true,
    createdAt: "2023-01-15T10:30:00.000Z",
    lastLogin: "2023-06-10T14:22:00.000Z",
    hasTwoFactorEnabled: true,
    organizationId: "1",
    phone: "+351 912 345 678",
  },
  {
    id: "7",
    email: "maria@legalflux.com",
    name: "Maria Fernandes",
    role: "lawyer",
    isActive: true,
    createdAt: "2023-02-20T09:15:00.000Z",
    lastLogin: "2023-06-12T11:05:00.000Z",
    hasTwoFactorEnabled: false,
    organizationId: "1",
    phone: "+351 926 789 012",
  },
  {
    id: "8",
    email: "joao@legalflux.com",
    name: "João Cardoso",
    role: "client",
    isActive: true,
    createdAt: "2023-03-05T14:45:00.000Z",
    lastLogin: "2023-06-09T16:30:00.000Z",
    hasTwoFactorEnabled: false,
    phone: "+351 935 678 901",
  },
  {
    id: "9",
    email: "teresa@legalflux.com",
    name: "Teresa Almeida",
    role: "client",
    isActive: false,
    createdAt: "2023-04-12T11:20:00.000Z",
    lastLogin: "2023-05-20T10:10:00.000Z",
    hasTwoFactorEnabled: false,
    phone: "+351 968 012 345",
  },
  {
    id: "10",
    email: "carlos@legalflux.com",
    name: "Carlos Santos",
    role: "assistant",
    isActive: true,
    createdAt: "2023-05-01T08:50:00.000Z",
    lastLogin: "2023-06-12T09:45:00.000Z",
    hasTwoFactorEnabled: false,
    organizationId: "1",
    phone: "+351 917 890 123",
  }
];

// Casos simulados
export const MOCK_CASES: Case[] = [
  {
    id: "1",
    title: "Processo de Divórcio Silva",
    clientId: "8",
    clientName: "João Cardoso",
    assignedLawyerId: "2",
    assignedLawyerName: "Advogado Demo",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "high",
    description: "Processo de divórcio litigioso com disputa de bens e guarda de filhos."
  },
  {
    id: "2",
    title: "Contrato de Arrendamento Comercial",
    clientId: "3",
    clientName: "Cliente Demo",
    assignedLawyerId: "4",
    assignedLawyerName: "Advogado Sênior Demo",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    priority: "medium",
    description: "Revisão e negociação de termos para arrendamento de espaço comercial."
  },
  {
    id: "3",
    title: "Disputa Trabalhista Ferreira",
    clientId: "9",
    clientName: "Teresa Almeida",
    assignedLawyerId: "6",
    assignedLawyerName: "Pedro Silva",
    status: "closed",
    createdAt: "2023-01-10T10:30:00.000Z",
    updatedAt: "2023-05-15T14:20:00.000Z",
    priority: "low",
    description: "Reclamação de horas extras não pagas e condições de trabalho inadequadas."
  }
];

// Tarefas simuladas
export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Preparar petição inicial",
    description: "Redigir e revisar a petição inicial para o processo de divórcio",
    caseId: "1",
    caseName: "Processo de Divórcio Silva",
    assignedToId: "2",
    assignedToName: "Advogado Demo",
    assignedById: "4",
    assignedByName: "Advogado Sênior Demo",
    status: "in_progress",
    priority: "high",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Revisar cláusulas contratuais",
    description: "Verificar e ajustar cláusulas do contrato comercial",
    caseId: "2",
    caseName: "Contrato de Arrendamento Comercial",
    assignedToId: "5",
    assignedToName: "Assistente Demo",
    assignedById: "4",
    assignedByName: "Advogado Sênior Demo",
    status: "todo",
    priority: "medium",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Contatar testemunhas",
    description: "Entrar em contato com testemunhas para agendamento de depoimentos",
    caseId: "3",
    caseName: "Disputa Trabalhista Ferreira",
    assignedToId: "10",
    assignedToName: "Carlos Santos",
    assignedById: "6",
    assignedByName: "Pedro Silva",
    status: "done",
    priority: "low",
    dueDate: "2023-05-10T14:00:00.000Z",
    createdAt: "2023-04-20T09:15:00.000Z",
    updatedAt: "2023-05-08T11:30:00.000Z"
  }
];

// Documentos simulados
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Petição Inicial - Divórcio Silva.pdf",
    caseId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "2",
    size: 1458672,
    type: "application/pdf",
    url: "/documents/peticao-inicial-divorcio.pdf",
    version: 1
  },
  {
    id: "2",
    name: "Contrato de Arrendamento Comercial - Rascunho.docx",
    caseId: "2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "4",
    size: 286720,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    url: "/documents/contrato-arrendamento-rascunho.docx",
    version: 3
  },
  {
    id: "3",
    name: "Comprovantes de Pagamento - Caso Trabalhista.zip",
    caseId: "3",
    createdAt: "2023-03-15T10:30:00.000Z",
    updatedAt: "2023-03-15T10:30:00.000Z",
    createdBy: "6",
    size: 3842048,
    type: "application/zip",
    url: "/documents/comprovantes-pagamento.zip",
    version: 1
  }
];

// Mensagens simuladas
export const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Precisamos agendar uma reunião para discutir os próximos passos do seu processo.",
    senderId: "2",
    senderName: "Advogado Demo",
    senderRole: "lawyer",
    receiverId: "8",
    receiverName: "João Cardoso",
    caseId: "1",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    content: "Recebi os documentos enviados. Vou analisá-los e retorno com feedback em breve.",
    senderId: "4",
    senderName: "Advogado Sênior Demo",
    senderRole: "senior_lawyer",
    receiverId: "3",
    receiverName: "Cliente Demo",
    caseId: "2",
    readAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    content: "Agendamos a audiência para o dia 15/07. Por favor, confirme sua disponibilidade.",
    senderId: "6",
    senderName: "Pedro Silva",
    senderRole: "lawyer",
    receiverId: "9",
    receiverName: "Teresa Almeida",
    caseId: "3",
    createdAt: "2023-05-10T14:30:00.000Z"
  }
];

// Transações financeiras simuladas
export const MOCK_FINANCIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: "1",
    clientId: "8",
    clientName: "João Cardoso",
    caseId: "1",
    caseName: "Processo de Divórcio Silva",
    amount: 1500,
    currency: "EUR",
    type: "invoice",
    status: "pending",
    date: new Date().toISOString(),
    description: "Honorários iniciais para processo de divórcio"
  },
  {
    id: "2",
    clientId: "3",
    clientName: "Cliente Demo",
    caseId: "2",
    caseName: "Contrato de Arrendamento Comercial",
    amount: 750,
    currency: "EUR",
    type: "payment",
    status: "completed",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Pagamento parcial de honorários"
  },
  {
    id: "3",
    clientId: "9",
    clientName: "Teresa Almeida",
    caseId: "3",
    caseName: "Disputa Trabalhista Ferreira",
    amount: 2200,
    currency: "EUR",
    type: "payment",
    status: "completed",
    date: "2023-05-20T10:15:00.000Z",
    description: "Liquidação total de honorários"
  }
];

// Organizations
export const MOCK_ORGANIZATIONS: Organization[] = [
  {
    id: "1",
    name: "LegalFlux Advogados",
    memberCount: 5,
    createdAt: "2023-01-01T10:00:00.000Z",
    address: "Av. da Liberdade 110, Lisboa",
    phone: "+351 210 123 456",
    email: "contato@legalflux.com"
  },
  {
    id: "2",
    name: "Silva & Associados",
    memberCount: 3,
    createdAt: "2023-02-15T14:30:00.000Z",
    address: "Rua Augusta 25, Lisboa",
    phone: "+351 210 987 654",
    email: "contato@silvaassociados.com"
  }
];

// Subscriptions
export const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "1",
    organizationId: "1",
    plan: "enterprise",
    status: "active",
    price: 199,
    currency: "EUR",
    currentPeriodStart: "2023-06-01T00:00:00.000Z",
    currentPeriodEnd: "2023-07-01T00:00:00.000Z",
    cancelAtPeriodEnd: false
  }
];

// Helper Functions

// Fetch organization by ID
export const getOrganizationById = (id: string): Organization | undefined => {
  return MOCK_ORGANIZATIONS.find(org => org.id === id);
};

// Fetch subscription by organization ID
export const getSubscriptionByOrgId = (orgId: string): Subscription | undefined => {
  return MOCK_SUBSCRIPTIONS.find(sub => sub.organizationId === orgId);
};

// Fetch cases by user ID and role
export const getCasesByUser = (userId: string, role: string): Case[] => {
  if (role === "admin" || role === "senior_lawyer") {
    return MOCK_CASES;
  } else if (role === "lawyer") {
    return MOCK_CASES.filter(c => c.assignedLawyerId === userId);
  } else if (role === "client") {
    return MOCK_CASES.filter(c => c.clientId === userId);
  } else if (role === "assistant") {
    // Assistants can only see cases they're specifically assigned to work with
    const assignedLawyerId = MOCK_USERS.find(u => u.id === userId)?.assignedToLawyerId;
    if (assignedLawyerId) {
      return MOCK_CASES.filter(c => c.assignedLawyerId === assignedLawyerId);
    }
  }
  return [];
};

// Fetch tasks by user ID and role
export const getTasksByUser = (userId: string, role: string): Task[] => {
  if (role === "admin" || role === "senior_lawyer") {
    return MOCK_TASKS;
  } else if (role === "lawyer" || role === "assistant") {
    return MOCK_TASKS.filter(t => t.assignedToId === userId || t.assignedById === userId);
  }
  return [];
};

// Fetch messages by user ID
export const getMessagesByUser = (userId: string): Message[] => {
  return MOCK_MESSAGES.filter(m => m.senderId === userId || m.receiverId === userId);
};

// Fetch financial transactions by user ID and role
export const getTransactionsByUser = (userId: string, role: string): FinancialTransaction[] => {
  if (role === "admin" || role === "senior_lawyer") {
    return MOCK_FINANCIAL_TRANSACTIONS;
  } else if (role === "lawyer") {
    // Lawyers can see transactions related to their cases
    const assignedCaseIds = MOCK_CASES
      .filter(c => c.assignedLawyerId === userId)
      .map(c => c.id);
    return MOCK_FINANCIAL_TRANSACTIONS.filter(t => 
      assignedCaseIds.includes(t.caseId || "") || t.type === "subscription"
    );
  } else if (role === "client") {
    return MOCK_FINANCIAL_TRANSACTIONS.filter(t => t.clientId === userId);
  }
  return [];
};

// Fetch documents by user ID and role
export const getDocumentsByUser = (userId: string, role: string): Document[] => {
  if (role === "admin" || role === "senior_lawyer") {
    return MOCK_DOCUMENTS;
  } else if (role === "lawyer" || role === "assistant") {
    const assignedCaseIds = MOCK_CASES
      .filter(c => c.assignedLawyerId === userId)
      .map(c => c.id);
    return MOCK_DOCUMENTS.filter(d => assignedCaseIds.includes(d.caseId || ""));
  } else if (role === "client") {
    const clientCaseIds = MOCK_CASES
      .filter(c => c.clientId === userId)
      .map(c => c.id);
    return MOCK_DOCUMENTS.filter(d => clientCaseIds.includes(d.caseId || ""));
  }
  return [];
};

// Filter users by organization and role
export const getUsersByOrganization = (orgId: string): User[] => {
  return MOCK_USERS.filter(user => user.organizationId === orgId);
};

// Get user by ID
export const getUserById = (id: string): User | undefined => {
  return MOCK_USERS.find(user => user.id === id);
};

// Update user data
export const updateUser = (id: string, userData: Partial<User>): User | undefined => {
  const userIndex = MOCK_USERS.findIndex(user => user.id === id);
  if (userIndex === -1) return undefined;
  
  // Update user data
  MOCK_USERS[userIndex] = {
    ...MOCK_USERS[userIndex],
    ...userData,
  };
  
  return MOCK_USERS[userIndex];
};

// Add a new user
export const addUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  const newId = (MOCK_USERS.length + 1).toString();
  const newUser: User = {
    id: newId,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    ...userData,
  };
  
  MOCK_USERS.push(newUser);
  return newUser;
};

// Delete a user
export const deleteUser = (id: string): boolean => {
  const userIndex = MOCK_USERS.findIndex(user => user.id === id);
  if (userIndex === -1) return false;
  
  MOCK_USERS.splice(userIndex, 1);
  return true;
};

// Helper function to generate mock data for charts and dashboards
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

export const getRecentCases = () => [
  {
    id: "1",
    title: "Processo de Divórcio Silva",
    clientName: "João Cardoso",
    clientAvatar: "",
    status: "active" as const,
  },
  {
    id: "2",
    title: "Contrato de Arrendamento",
    clientName: "Pedro Santos",
    clientAvatar: "",
    status: "pending" as const,
  },
  {
    id: "3",
    title: "Disputa Trabalhista",
    clientName: "Teresa Almeida",
    clientAvatar: "",
    status: "closed" as const,
  },
];

export const getRecentTasks = () => [
  {
    id: "1",
    title: "Preparar petição inicial",
    assignedToName: "Advogado Demo",
    assignedToAvatar: "",
    priority: "high" as const,
  },
  {
    id: "2",
    title: "Revisar contrato",
    assignedToName: "Assistente Demo",
    assignedToAvatar: "",
    priority: "medium" as const,
  },
  {
    id: "3",
    title: "Agendar audiência",
    assignedToName: "Carlos Santos",
    assignedToAvatar: "",
    priority: "low" as const,
  },
];
