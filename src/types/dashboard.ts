
export interface StatisticsProps {
  activeProcesses: number;
  pendingDocuments: number;
  completedCases: number;
  averageResolutionTime: number;
  userOrganization: string;
}

export interface RecentCase {
  id: string;
  title: string;
  status: string;
  client: string; 
  clientName: string;
  clientAvatar?: string;
  updatedAt: string | Date;
  date?: string;
  action?: string;
}

export interface RecentTask {
  id: string;
  title: string;
  deadline: string;
  priority: string;
  assigned: string;
  assignedToName: string;
  assignedToAvatar?: string;
  status?: string;
}

export interface FinancialStatsWidgetProps {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueChange: number;
  pendingPayments: number;
  averageInvoice: number;
}

export interface Task {
  id: string;
  title: string;
  priority: string;
  dueDate: string;
  status: string;
}

export interface ChartDataPoint {
  name: string;
  cases: number;
}

export interface PerformanceData {
  name: string;
  completed: number;
  pending: number;
}
