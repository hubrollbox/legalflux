
import { UserRole } from "@/types/permissions";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  hasTwoFactorEnabled: boolean;
  phone?: string;
  organizationId?: string;
  lastLogin?: string;
  avatar?: string;
}

export interface FinancialTransaction {
  id: string;
  type: 'income' | 'expense' | 'invoice' | 'payment';
  amount: number;
  currency: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled' | 'failed';
  category: string;
  processId?: string;
  clientId?: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    name: "Ana Pereira",
    email: "ana.pereira@example.com",
    role: UserRole.ADMIN,
    isActive: true,
    createdAt: "2023-01-15T10:30:00Z",
    hasTwoFactorEnabled: true,
    phone: "+351 912 345 678",
    organizationId: "org-123",
    lastLogin: "2023-04-10T14:22:00Z",
    avatar: "/avatars/ana.jpg"
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao.silva@example.com",
    role: UserRole.LAWYER,
    isActive: true,
    createdAt: "2023-02-20T09:15:00Z",
    hasTwoFactorEnabled: false,
    phone: "+351 923 456 789",
    organizationId: "org-123",
    lastLogin: "2023-04-09T11:45:00Z",
    avatar: "/avatars/joao.jpg"
  },
  {
    id: "3",
    name: "Maria Santos",
    email: "maria.santos@example.com",
    role: UserRole.ASSISTANT,
    isActive: true,
    createdAt: "2023-03-05T14:45:00Z",
    hasTwoFactorEnabled: false,
    phone: "+351 934 567 890",
    organizationId: "org-123",
    lastLogin: "2023-04-10T09:30:00Z",
    avatar: "/avatars/maria.jpg"
  },
  {
    id: "4",
    name: "Pedro Costa",
    email: "pedro.costa@example.com",
    role: UserRole.CLIENT,
    isActive: false,
    createdAt: "2023-02-10T16:20:00Z",
    hasTwoFactorEnabled: false,
    phone: "+351 945 678 901",
    organizationId: "org-456",
    lastLogin: "2023-03-15T13:10:00Z",
    avatar: "/avatars/pedro.jpg"
  },
  {
    id: "5",
    name: "Sofia Martins",
    email: "sofia.martins@example.com",
    role: UserRole.SENIOR_LAWYER,
    isActive: true,
    createdAt: "2023-01-05T11:00:00Z",
    hasTwoFactorEnabled: true,
    phone: "+351 956 789 012",
    organizationId: "org-123",
    lastLogin: "2023-04-09T16:50:00Z",
    avatar: "/avatars/sofia.jpg"
  }
];

export const mockTransactions: FinancialTransaction[] = [
  {
    id: "tr-1",
    type: "income",
    amount: 1250.00,
    currency: "EUR",
    description: "Pagamento consulta inicial - Processo #P-123",
    date: "2023-05-15T10:30:00Z",
    status: "completed",
    category: "Honorários",
    processId: "P-123",
    clientId: "C-1"
  },
  {
    id: "tr-2",
    type: "expense",
    amount: 150.00,
    currency: "EUR",
    description: "Despesas de Tribunal - Processo #P-123",
    date: "2023-05-16T14:45:00Z",
    status: "completed",
    category: "Despesas Processo",
    processId: "P-123"
  },
  {
    id: "tr-3",
    type: "invoice",
    amount: 750.00,
    currency: "EUR",
    description: "Fatura #INV-456 - Representação em Tribunal",
    date: "2023-05-20T09:00:00Z",
    status: "pending",
    category: "Honorários",
    processId: "P-456",
    clientId: "C-2"
  },
  {
    id: "tr-4",
    type: "payment",
    amount: 500.00,
    currency: "EUR",
    description: "Recebimento parcial - Fatura #INV-456",
    date: "2023-05-25T11:30:00Z",
    status: "completed",
    category: "Pagamento Parcial",
    processId: "P-456",
    clientId: "C-2"
  },
  {
    id: "tr-5",
    type: "expense",
    amount: 75.50,
    currency: "EUR",
    description: "Despesas de Deslocação - Processo #P-456",
    date: "2023-05-27T15:20:00Z",
    status: "completed",
    category: "Despesas Deslocação",
    processId: "P-456"
  }
];

export const getTransactionsByUser = (userId?: string): FinancialTransaction[] => {
  // Numa implementação real, filtraríamos pelo ID do usuário
  // Nesta mock, retornamos todas as transações
  return mockTransactions;
};
