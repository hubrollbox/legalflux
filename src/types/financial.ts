
export type TransactionType = 'income' | 'expense' | 'invoice' | 'payment' | 'refund' | 'other';
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'cancelled' | 'refunded' | 'overdue';

export interface FinancialTransaction {
  id: string;
  description: string;
  amount: number;
  date: string | Date;
  type: TransactionType;
  status: TransactionStatus;
  category?: string;
  clientId?: string;
  clientName?: string;
  processId?: string;
  processName?: string;
  documentId?: string;
  paymentMethod?: string;
  paymentDate?: string | Date;
  dueDate?: string | Date;
  invoiceNumber?: string;
  notes?: string;
  tags?: string[];
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  pendingPayments: number;
  overdueBills: number;
  currentMonthIncome: number;
  currentMonthExpenses: number;
  previousMonthIncome: number;
  previousMonthExpenses: number;
}

export interface FinancialChartData {
  name: string;
  revenue: number;
  expenses: number;
}
