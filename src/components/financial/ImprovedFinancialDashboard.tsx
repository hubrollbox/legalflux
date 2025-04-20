import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, Calendar, FileText, BarChart2, PieChart } from 'lucide-react';
import type { FinancialTransaction } from '@/types';
import FinancialCard from './FinancialCard';

interface ImprovedFinancialDashboardProps {
  transactions: FinancialTransaction[];
}

const ImprovedFinancialDashboard: React.FC<ImprovedFinancialDashboardProps> = ({ transactions }) => {
  // Calcular métricas financeiras baseadas nas transações
  const calculateMetrics = () => {
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

    const previousMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const currentDate = new Date();
      const previousMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
      const previousYear = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
      return transactionDate.getMonth() === previousMonth && 
             transactionDate.getFullYear() === previousYear;
    });

    const previousMonthRevenue = previousMonthTransactions
      .filter(t => t.type === 'payment' && t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0);

    // Calcular variação percentual
    const revenueChange = previousMonthRevenue === 0 ? 100 : 
      ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
      
    return [
      {
        title: 'Receita Total',
        value: `€${totalRevenue.toLocaleString('pt-PT')}`,
        change: `${revenueChange > 0 ? '+' : ''}${revenueChange.toFixed(1)}%`,
        isPositive: revenueChange >= 0,
        icon: <DollarSign className="h-6 w-6 text-green-500" />,
        description: 'Comparado ao mês anterior'
      },
      {
        title: 'Pendente',
        value: `€${totalPending.toLocaleString('pt-PT')}`,
        change: '+5.2%',
        isPositive: true,
        icon: <Calendar className="h-6 w-6 text-amber-500" />,
        description: 'Faturas a receber'
      },
      {
        title: 'Despesas',
        value: `€${totalExpenses.toLocaleString('pt-PT')}`,
        change: '-3.1%',
        isPositive: false,
        icon: <CreditCard className="h-6 w-6 text-red-500" />,
        description: 'Redução em relação ao mês anterior'
      },
      {
        title: 'Este Mês',
        value: `€${currentMonthRevenue.toLocaleString('pt-PT')}`,
        change: '+8.4%',
        isPositive: true,
        icon: <FileText className="h-6 w-6 text-blue-500" />,
        description: 'Projeção de fechamento: +12%'
      }
    ];
  };

  const metrics = calculateMetrics();

  return (
    <div className="space-y-6">
      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <FinancialCard 
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            isPositive={metric.isPositive}
            icon={metric.icon}
            description={metric.description}
          />
        ))}
      </div>

      {/* Gráficos e Análises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <BarChart2 className="h-5 w-5 mr-2 text-primary" />
              Receitas vs Despesas
            </CardTitle>
            <CardDescription>Análise comparativa dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
              {/* Aqui seria implementado o gráfico real */}
              <p className="text-muted-foreground">Gráfico de Barras: Receitas vs Despesas</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-primary" />
              Distribuição de Receitas
            </CardTitle>
            <CardDescription>Por tipo de serviço no mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/30 rounded-md flex items-center justify-center">
              {/* Aqui seria implementado o gráfico real */}
              <p className="text-muted-foreground">Gráfico de Pizza: Distribuição de Receitas</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumo de Transações Recentes */}
      <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Transações Recentes</CardTitle>
          <CardDescription>Últimas 5 transações registradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Descrição</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Valor</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Data</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                                  {transactions.slice(0, 5).map((transaction, index) => (
                                    <tr key={index} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{transaction.description}</td>
                      <td className="py-3 px-4 text-right font-medium">
                        <span className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toLocaleString('pt-PT', {style: 'currency', currency: 'EUR'})}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString('pt-PT')}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          transaction.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {transaction.status === 'completed' ? 'Concluído' :
                           transaction.status === 'pending' ? 'Pendente' :
                           transaction.status === 'failed' ? 'Falhou' :
                           transaction.status === 'canceled' ? 'Cancelado' : transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImprovedFinancialDashboard;