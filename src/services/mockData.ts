
import { User, Process, Document } from '@/types';

export interface FinancialTransaction {
  id: string;
  amount: number;
  type: 'invoice' | 'payment' | 'refund';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  clientId: string;
  caseId?: string;
  description?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedToId: string;
  createdById: string;
  caseId?: string;
}

// Dados de usuários
export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'advogado1@legalflux.pt',
    name: 'António Silva',
    role: 'lawyer',
    isActive: true,
    createdAt: '2023-01-15T10:30:00Z',
    lastLogin: '2023-05-01T08:45:00Z',
    avatar: '/avatars/antonio.jpg',
    status: 'active'
  },
  {
    id: '2',
    email: 'advogado.senior@legalflux.pt',
    name: 'Maria Ferreira',
    role: 'senior_lawyer',
    isActive: true,
    createdAt: '2022-11-10T14:20:00Z',
    lastLogin: '2023-05-01T09:15:00Z',
    avatar: '/avatars/maria.jpg',
    status: 'active'
  },
  {
    id: '3',
    email: 'assistente@legalflux.pt',
    name: 'João Carvalho',
    role: 'assistant',
    isActive: true,
    createdAt: '2023-02-20T11:45:00Z',
    lastLogin: '2023-04-30T16:30:00Z',
    avatar: '/avatars/joao.jpg',
    status: 'active'
  },
  {
    id: '4',
    email: 'cliente1@empresa.pt',
    name: 'Pedro Almeida',
    role: 'client',
    isActive: true,
    createdAt: '2023-03-05T09:10:00Z',
    lastLogin: '2023-04-28T14:20:00Z',
    assignedToLawyerId: '1',
    avatar: '/avatars/pedro.jpg',
    status: 'active'
  },
  {
    id: '5',
    email: 'admin@legalflux.pt',
    name: 'Ana Costa',
    role: 'admin',
    isActive: true,
    createdAt: '2022-10-01T08:00:00Z',
    lastLogin: '2023-05-01T07:30:00Z',
    avatar: '/avatars/ana.jpg',
    status: 'active'
  }
];

// Dados de processos
export const MOCK_CASES: Process[] = [
  {
    id: '101',
    title: 'Processo Cível 123/2023',
    clientId: '4',
    lawyerId: '1',
    status: 'active',
    type: 'civil',
    createdAt: '2023-03-10T09:30:00Z',
    updatedAt: '2023-04-28T14:15:00Z',
    description: 'Ação de indemnização por danos materiais. Caso Cível.',
    priority: 'high',
    deadline: '2023-06-15T23:59:59Z',
    reference: 'REF-CIV-123-2023'
  },
  {
    id: '102',
    title: 'Divórcio Consensual',
    clientId: '4',
    lawyerId: '2',
    status: 'active',
    type: 'family',
    createdAt: '2023-02-20T10:15:00Z',
    updatedAt: '2023-04-25T11:30:00Z',
    description: 'Processo de divórcio por mútuo consentimento. Caso de Família.',
    priority: 'medium',
    deadline: '2023-07-01T23:59:59Z',
    reference: 'REF-FAM-087-2023'
  },
  {
    id: '103',
    title: 'Contrato de Arrendamento',
    clientId: '4',
    lawyerId: '1',
    status: 'closed',
    type: 'contract',
    createdAt: '2023-01-15T14:45:00Z',
    updatedAt: '2023-04-10T09:20:00Z',
    description: 'Elaboração e revisão de contrato de arrendamento comercial.',
    priority: 'low',
    reference: 'REF-CONT-054-2023'
  },
  {
    id: '104',
    title: 'Processo Trabalhista',
    clientId: '4',
    lawyerId: '2',
    status: 'active',
    type: 'labor',
    createdAt: '2023-04-05T11:00:00Z',
    updatedAt: '2023-04-30T16:45:00Z',
    description: 'Reclamação trabalhista por horas extras não pagas. Caso Trabalhista.',
    priority: 'high',
    deadline: '2023-08-10T23:59:59Z',
    reference: 'REF-TRAB-221-2023'
  },
  {
    id: '105',
    title: 'Constituição de Empresa',
    clientId: '4',
    lawyerId: '1',
    status: 'closed',
    type: 'corporate',
    createdAt: '2022-12-01T10:30:00Z',
    updatedAt: '2023-01-20T15:15:00Z',
    description: 'Assessoria para constituição de sociedade por quotas.',
    priority: 'medium',
    reference: 'REF-CORP-188-2022'
  }
];

// Dados de documentos
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '201',
    title: 'Petição Inicial',
    processId: '101',
    lawyerId: '1',
    status: 'final',
    type: 'petition',
    createdAt: '2023-03-10T10:30:00Z',
    updatedAt: '2023-03-12T14:15:00Z',
    fileUrl: '/documents/peticao-inicial.pdf',
    fileSize: 1450000,
    version: 1,
    tags: ['civil', 'petição', 'indemnização']
  },
  {
    id: '202',
    title: 'Acordo de Divórcio',
    processId: '102',
    lawyerId: '2',
    status: 'draft',
    type: 'agreement',
    createdAt: '2023-02-22T09:45:00Z',
    updatedAt: '2023-04-18T11:30:00Z',
    fileUrl: '/documents/acordo-divorcio-v2.docx',
    fileSize: 850000,
    version: 2,
    tags: ['família', 'divórcio', 'acordo']
  },
  {
    id: '203',
    title: 'Contrato de Arrendamento',
    processId: '103',
    lawyerId: '1',
    status: 'final',
    type: 'contract',
    createdAt: '2023-01-18T16:20:00Z',
    updatedAt: '2023-02-05T10:10:00Z',
    fileUrl: '/documents/contrato-arrendamento.pdf',
    fileSize: 1250000,
    version: 3,
    tags: ['contrato', 'arrendamento', 'comercial']
  },
  {
    id: '204',
    title: 'Procuração',
    clientId: '4',
    lawyerId: '2',
    status: 'pending',
    type: 'power_of_attorney',
    createdAt: '2023-04-07T09:15:00Z',
    updatedAt: '2023-04-07T09:15:00Z',
    fileUrl: '/documents/procuracao.pdf',
    fileSize: 540000,
    version: 1,
    tags: ['procuração', 'representação']
  },
  {
    id: '205',
    title: 'Estatuto Social',
    processId: '105',
    lawyerId: '1',
    status: 'final',
    type: 'corporate',
    createdAt: '2022-12-05T14:30:00Z',
    updatedAt: '2022-12-20T11:45:00Z',
    fileUrl: '/documents/estatuto-social.pdf',
    fileSize: 980000,
    version: 2,
    tags: ['empresarial', 'estatuto', 'sociedade']
  }
];

// Dados de transações financeiras
export const MOCK_FINANCIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: '301',
    amount: 2500,
    type: 'invoice',
    status: 'completed',
    date: '2023-03-15T14:30:00Z',
    clientId: '4',
    caseId: '101',
    description: 'Honorários iniciais - Processo Cível 123/2023'
  },
  {
    id: '302',
    amount: 1800,
    type: 'invoice',
    status: 'completed',
    date: '2023-02-25T10:15:00Z',
    clientId: '4',
    caseId: '102',
    description: 'Honorários iniciais - Divórcio Consensual'
  },
  {
    id: '303',
    amount: 1500,
    type: 'payment',
    status: 'completed',
    date: '2023-03-20T09:45:00Z',
    clientId: '4',
    caseId: '101',
    description: 'Pagamento parcial - Fatura 301'
  },
  {
    id: '304',
    amount: 1200,
    type: 'invoice',
    status: 'pending',
    date: '2023-04-10T11:30:00Z',
    clientId: '4',
    caseId: '104',
    description: 'Honorários iniciais - Processo Trabalhista'
  },
  {
    id: '305',
    amount: 1800,
    type: 'payment',
    status: 'completed',
    date: '2023-03-01T15:20:00Z',
    clientId: '4',
    caseId: '102',
    description: 'Pagamento total - Fatura 302'
  }
];

// Dados de tarefas
export const MOCK_TASKS: Task[] = [
  {
    id: '401',
    title: 'Elaborar petição inicial',
    description: 'Preparar a petição inicial para o processo cível 123/2023',
    dueDate: '2023-03-12T23:59:59Z',
    status: 'completed',
    priority: 'high',
    assignedToId: '1',
    createdById: '2',
    caseId: '101'
  },
  {
    id: '402',
    title: 'Revisar acordo de divórcio',
    description: 'Revisar os termos do acordo de divórcio conforme solicitações do cliente',
    dueDate: '2023-04-20T23:59:59Z',
    status: 'in_progress',
    priority: 'medium',
    assignedToId: '2',
    createdById: '2',
    caseId: '102'
  },
  {
    id: '403',
    title: 'Agendar reunião com cliente',
    description: 'Agendar reunião para coleta de documentos trabalhistas',
    dueDate: '2023-04-08T23:59:59Z',
    status: 'completed',
    priority: 'medium',
    assignedToId: '3',
    createdById: '1',
    caseId: '104'
  },
  {
    id: '404',
    title: 'Protocolar petição inicial',
    description: 'Protocolar a petição inicial do processo cível no tribunal',
    dueDate: '2023-03-15T23:59:59Z',
    status: 'completed',
    priority: 'high',
    assignedToId: '3',
    createdById: '1',
    caseId: '101'
  },
  {
    id: '405',
    title: 'Preparar audiência trabalhista',
    description: 'Organizar documentos e preparar argumentos para audiência',
    dueDate: '2023-05-15T23:59:59Z',
    status: 'pending',
    priority: 'high',
    assignedToId: '2',
    createdById: '2',
    caseId: '104'
  }
];
