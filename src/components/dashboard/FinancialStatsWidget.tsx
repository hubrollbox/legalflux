
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Clock, Calculator } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { FinancialStatsWidgetProps } from '@/types/dashboard';

const FinancialStatsWidget: React.FC<{ stats: FinancialStatsWidgetProps }> = ({ stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Resumo Financeiro</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-green-500" />
            <span className="font-medium">Receita Total</span>
          </div>
          <span className="font-bold">{formatCurrency(stats.totalRevenue)}</span>
        </div>
        
        <div className="flex justify-between items-center border-b py-2">
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
            <span className="font-medium">Receita Mensal</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold">{formatCurrency(stats.monthlyRevenue)}</span>
            <span className={`text-xs ml-2 ${stats.revenueChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.revenueChange >= 0 ? '+' : ''}{stats.revenueChange}%
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-b py-2">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-orange-500" />
            <span className="font-medium">Pagamentos Pendentes</span>
          </div>
          <span className="font-bold">{formatCurrency(stats.pendingPayments)}</span>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center">
            <Calculator className="h-4 w-4 mr-2 text-purple-500" />
            <span className="font-medium">Fatura Média</span>
          </div>
          <span className="font-bold">{formatCurrency(stats.averageInvoice)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialStatsWidget;
