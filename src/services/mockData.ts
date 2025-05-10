
import { FinancialTransaction, TransactionType, TransactionStatus } from "@/types/financial";

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

export const getTransactionsByUser = () => {
  return MOCK_FINANCIAL_TRANSACTIONS;
};

export const MOCK_FINANCIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: "f1",
    date: new Date("2023-05-20"),
    description: "Pagamento de honorários",
    amount: 1500.00,
    type: TransactionType.INCOME,
    status: TransactionStatus.COMPLETED,
    category: "Honorários",
    clientName: "João Silva",
    processId: "2023/001"
  },
  {
    id: "f2",
    date: new Date("2023-05-18"),
    description: "Pagamento de despesas processuais",
    amount: -300.00,
    type: TransactionType.EXPENSE,
    status: TransactionStatus.COMPLETED,
    category: "Despesas Processuais",
    clientName: "Maria Santos",
    processId: "2023/002"
  },
  {
    id: "f3",
    date: new Date("2023-05-15"),
    description: "Recebimento de cliente",
    amount: 2000.00,
    type: TransactionType.INCOME,
    status: TransactionStatus.COMPLETED,
    category: "Recebimento",
    clientName: "António Costa",
    processId: "2023/003"
  }
];
