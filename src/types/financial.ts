
// Financial transaction statuses
export type TransactionStatus = 'pending' | 'completed' | 'cancelled' | 'canceled' | 'failed' | 'processing';

// Financial transaction types
export type TransactionType = 'income' | 'expense' | 'payment' | 'invoice' | 'refund';

// Financial transaction interface
export interface FinancialTransaction {
  id: string;
  date: string | Date;
  description: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  category?: string;
  clientId?: string;
  clientName?: string;
  processId?: string;
  processName?: string;
  paymentMethod?: string;
  reference?: string;
  currency?: string;
  notes?: string;
  createdBy?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  dueDate?: string | Date;
  attachments?: string[];
}

// Financial account interface
export interface FinancialAccount {
  id: string;
  name: string;
  type: 'bank' | 'cash' | 'credit' | 'investment';
  balance: number;
  currency: string;
  institution?: string;
  number?: string;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

// Financial invoice interface
export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  issueDate: string | Date;
  dueDate: string | Date;
  totalAmount: number;
  paidAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'refunded';
  currency: string;
  notes?: string;
  items: InvoiceItem[];
  createdAt: string | Date;
  updatedAt?: string | Date;
}

// Invoice item interface
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate?: number;
  taxAmount?: number;
}

// Budget interface
export interface Budget {
  id: string;
  name: string;
  period: 'monthly' | 'quarterly' | 'annual';
  startDate: string | Date;
  endDate: string | Date;
  categories: BudgetCategory[];
  totalBudget: number;
  totalSpent: number;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

// Budget category interface
export interface BudgetCategory {
  id: string;
  name: string;
  budgetAmount: number;
  spentAmount: number;
  color?: string;
}

// Financial stats interface
export interface FinancialStats {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueChange: number;
  pendingPayments: number;
  averageInvoice: number;
}
