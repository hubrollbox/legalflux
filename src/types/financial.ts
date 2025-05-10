
// Definindo os tipos como types para exportação explícita
export type TransactionType = "income" | "expense" | "payment" | "invoice" | "refund";
export type TransactionStatus = "pending" | "completed" | "cancelled" | "failed" | "canceled" | "processing";

export interface FinancialTransaction {
  id: string;
  type: TransactionType; 
  amount: number;
  status: TransactionStatus;
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
