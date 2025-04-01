
import { User, Case, Task, Document, Message, FinancialTransaction } from "@/types";

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
