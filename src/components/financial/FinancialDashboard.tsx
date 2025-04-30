import * as React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Calendar, FileText } from 'lucide-react';
import type { FinancialTransaction } from '@/types';

interface FinancialMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  description?: string;
}

interface FinancialDashboardProps {
  transactions: FinancialTransaction[];
}

const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ transactions }) => {
  // Calcular métricas financeiras baseadas nas transações
  const calculateMetrics = (): FinancialMetric[] => {
    // Calculate current month metrics
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const currentDate = new Date();
      return transactionDate.getMonth() === currentDate.getMonth() && 
             transactionDate.getFullYear() === currentDate.getFullYear();
    });
    
    // Calculate previous month metrics for comparison
    const previousMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const currentDate = new Date();
      const previousMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
      const previousYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
      return transactionDate.getMonth() === previousMonth && 
             transactionDate.getFullYear() === previousYear;
    });
    
    // Calculate all metrics
    const totalRevenue = transactions
      .filter(t => t.type === 'payment' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalPending = transactions
      .filter(t => t.type === 'invoice' && t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = transactions
      .filter(t => t.type === 'refund' || (t.type === 'payment' && t.amount < 0))
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
    const currentMonthRevenue = currentMonthTransactions
      .filter(t => t.type === 'payment' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const previousMonthRevenue = previousMonthTransactions
      .filter(t => t.type === 'payment' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate percentage changes
    const revenueChange = previousMonthRevenue === 0 ? 100 : 
      ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
    
    return [
      {
        title: 'Receita Total',
        value: `€${totalRevenue.toLocaleString('pt-PT')}`,
        change: `${revenueChange > 0 ? '+' : ''}${revenueChange.toFixed(1)}%`,
        isPositive: revenueChange >= 0,
        icon: <DollarSign className="h-5 w-5 text-green-500" />,
        description: 'Comparado ao mês anterior'
      },
      {
        title: 'Pendente',
        value: `€${totalPending.toLocaleString('pt-PT')}`,
        change: '+5%',
        isPositive: true,
        icon: <Calendar className="h-5 w-5 text-amber-500" />,
        description: 'Faturas a receber'
      },
      {
        title: 'Despesas',
        value: `€${totalExpenses.toLocaleString('pt-PT')}`,
        change: '-3%',
        isPositive: false,
        icon: <CreditCard className="h-5 w-5 text-red-500" />,
        description: 'Redução em relação ao mês anterior'
      },
      {
        title: 'Este Mês',
        value: `€${currentMonthRevenue.toLocaleString('pt-PT')}`,
        change: '+8%',
        isPositive: true,
        icon: <FileText className="h-5 w-5 text-blue-500" />,
        description: 'Projeção de fechamento: +12%'
      }
    ];
  };

  const metrics = calculateMetrics();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="financial-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                <div className={`flex items-center mt-1 ${metric.isPositive ? 'text-green-500' : 'text-red-500'} text-sm`}>
                  {metric.isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className={`h-10 w-10 rounded-full ${metric.isPositive ? 'bg-green-500/10' : 'bg-red-500/10'} flex items-center justify-center`}>
                {metric.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FinancialDashboard;