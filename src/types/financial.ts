
// Definindo os tipos como enums para melhor tipagem
export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
  PAYMENT = "payment",
  INVOICE = "invoice",
  REFUND = "refund"
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed", 
  CANCELLED = "cancelled",
  FAILED = "failed",
  CANCELED = "canceled",
  PROCESSING = "processing"
}

export interface FinancialTransaction {
  id: string;
  type: TransactionType | string; 
  amount: number;
  status: TransactionStatus | string;
  description: string;
  date: string | Date;
  clientId?: string;
  clientName?: string;
  processId?: string;
  category?: string;
  paymentMethod?: string;
  invoiceNumber?: string;
}

export interface FinancialSummary {
  income: number;
  expenses: number;
  pending: number;
  balance: number;
  monthlyChange: number;
}
