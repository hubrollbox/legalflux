
// Definição dos tipos de transações financeiras
export enum TransactionType {
  INVOICE = 'invoice',
  PAYMENT = 'payment',
  REFUND = 'refund',
  INCOME = 'income',
  EXPENSE = 'expense',
  OTHER = 'other'
}

// Definição dos status de transações financeiras
export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  OVERDUE = 'overdue'
}

// Interface para transações financeiras
export interface FinancialTransaction {
  id: string;
  amount: number;
  type: TransactionType | string;
  status: TransactionStatus | string;
  date: string | Date;
  description?: string;
  client?: string;
  process?: string;
  paymentMethod?: string;
  category?: string;
  notes?: string;
  attachments?: string[];
  createdBy?: string;
  updatedAt?: string | Date;
}
