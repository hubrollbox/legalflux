
// Enum para tipos de transações
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
  INVOICE = 'invoice',
  PAYMENT = 'payment',
  REFUND = 'refund',
  OTHER = 'other'
}

// Enum para status de transações
export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  OVERDUE = 'overdue',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

// Interface para transações
export interface Transaction {
  id: string;
  date: Date | string;
  description: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  clientId?: string;
  processId?: string;
  category?: string;
  notes?: string;
  paymentMethod?: string;
}
