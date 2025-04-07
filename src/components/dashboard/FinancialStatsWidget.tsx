import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import DashboardWidget from './DashboardWidget';

interface FinancialStats {
  totalRevenue: number;
  monthlyRevenue: number;
  revenueChange: number;
  pendingPayments: number;
  averageInvoice: number;
}

interface FinancialStatsWidgetProps {
  stats: FinancialStats;
  className?: string;
}

const FinancialStatsWidget: React.FC<FinancialStatsWidgetProps> = ({
  stats,
  className = '',
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <DashboardWidget 
      title="Resumo Financeiro" 
      description="Visão geral das suas finanças"
      className={className}
      collapsible
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {/* Receita Mensal */}
          <Card className="bg-blue-50 border-blue-100">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-700 font-medium">Receita Mensal</p>
                  <p className="text-lg font-bold text-blue-900">{formatCurrency(stats.monthlyRevenue)}</p>
                </div>
                <div className="bg-blue-100 p-2 rounded-full">
                  <DollarSign className="h-4 w-4 text-blue-700" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs">
                {stats.revenueChange > 0 ? (
                  <>
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600">+{stats.revenueChange}% vs. mês anterior</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                    <span className="text-red-600">{stats.revenueChange}% vs. mês anterior</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Receita Total */}
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-700 font-medium">Receita Total</p>
                  <p className="text-lg font-bold text-green-900">{formatCurrency(stats.totalRevenue)}</p>
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <DollarSign className="h-4 w-4 text-green-700" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs text-green-700">
                <span>Acumulado anual</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Pagamentos Pendentes */}
          <Card className="bg-yellow-50 border-yellow-100">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-yellow-700 font-medium">Pagamentos Pendentes</p>
                  <p className="text-lg font-bold text-yellow-900">{formatCurrency(stats.pendingPayments)}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded-full">
                  <AlertCircle className="h-4 w-4 text-yellow-700" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs text-yellow-700">
                <span>Aguardando recebimento</span>
              </div>
            </CardContent>
          </Card>

          {/* Valor Médio */}
          <Card className="bg-purple-50 border-purple-100">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-700 font-medium">Valor Médio</p>
                  <p className="text-lg font-bold text-purple-900">{formatCurrency(stats.averageInvoice)}</p>
                </div>
                <div className="bg-purple-100 p-2 rounded-full">
                  <CreditCard className="h-4 w-4 text-purple-700" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-xs text-purple-700">
                <span>Por fatura emitida</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardWidget>
  );
};

export default FinancialStatsWidget;