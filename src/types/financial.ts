
export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
  INVOICE = "invoice",
  PAYMENT = "payment",
  REFUND = "refund" // Adicionado
}

export enum TransactionStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  OVERDUE = "overdue",
  FAILED = "failed", // Adicionado
  CANCELED = "canceled" // Adicionado (nota: diferente de CANCELLED)
}

export interface FinancialTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: Date;
  status: TransactionStatus;
  clientId?: string;
  clientName?: string;
  processId?: string;
  processName?: string;
  dueDate?: Date;
  paymentMethod?: string;
  category?: string;
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
  createdBy: string;
  attachments?: string[];
}
