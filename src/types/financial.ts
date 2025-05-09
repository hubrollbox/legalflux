
export interface FinancialTransaction {
  id: string;
  date: Date | string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  status: 'pending' | 'completed' | 'cancelled';
  clientName: string;
  processId?: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  pendingIncome: number;
  pendingExpense: number;
}

export interface FinancialChartData {
  month: string;
  income: number;
  expense: number;
}
