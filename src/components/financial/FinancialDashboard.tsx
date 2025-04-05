import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Calendar, FileText } from 'lucide-react';
import { FinancialTransaction } from '@/types';

interface FinancialMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

interface FinancialDashboardProps {
  transactions: FinancialTransaction[];
}

const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ transactions }) => {
  // Calcular métricas financeiras baseadas nas transações
  const calculateMetrics = (): FinancialMetric[] => {
    // Aqui você implementaria a lógica real para calcular as métricas
    // Este é um exemplo simplificado
    
    const totalRevenue = transactions
      .filter(t => t.type === 'payment' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalPending = transactions
      .filter(t => t.type === 'invoice' && t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = transactions
      .filter(t => t.type === 'refund' || (t.type === 'payment' && t.amount < 0))
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const currentDate = new Date();
      return transactionDate.getMonth() === currentDate.getMonth() && 
             transactionDate.getFullYear() === currentDate.getFullYear();
    });
    
    const currentMonthRevenue = currentMonthTransactions
      .filter(t => t.type === 'payment' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);
      
    return [
      {
        title: 'Receita Total',
        value: `€${totalRevenue.toLocaleString('pt-PT')}`,
        change: '+12%',
        isPositive: true,
        icon: <DollarSign className="h-5 w-5 text-green-500" />
      },
      {
        title: 'Pendente',
        value: `€${totalPending.toLocaleString('pt-PT')}`,
        change: '+5%',
        isPositive: true,
        icon: <Calendar className="h-5 w-5 text-amber-500" />
      },
      {
        title: 'Despesas',
        value: `€${totalExpenses.toLocaleString('pt-PT')}`,
        change: '-3%',
        isPositive: false,
        icon: <CreditCard className="h-5 w-5 text-red-500" />
      },
      {
        title: 'Este Mês',
        value: `€${currentMonthRevenue.toLocaleString('pt-PT')}`,
        change: '+8%',
        isPositive: true,
        icon: <FileText className="h-5 w-5 text-blue-500" />
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