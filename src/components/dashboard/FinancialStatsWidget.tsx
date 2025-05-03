
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, CreditCard } from "lucide-react";

interface FinancialStatsWidgetProps {
  data: {
    totalRevenue: number;
    totalExpenses: number;
    pendingInvoices: number;
    outstandingPayments: number;
  };
  className?: string;
}

const FinancialStatsWidget: React.FC<FinancialStatsWidgetProps> = ({ data, className }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);
  };

  const cards = [
    {
      title: "Receita Total",
      value: formatCurrency(data.totalRevenue),
      icon: DollarSign,
      trend: {
        value: 12.5,
        isPositive: true
      },
      color: "bg-blue-50 border-blue-100 hover:bg-blue-100"
    },
    {
      title: "Faturação Mensal",
      value: formatCurrency(data.totalRevenue / 12),
      icon: TrendingUp,
      color: "bg-green-50 border-green-100 hover:bg-green-100"
    },
    {
      title: "Despesas",
      value: formatCurrency(data.totalExpenses),
      icon: TrendingDown,
      trend: {
        value: -2.3,
        isPositive: false
      },
      color: "bg-amber-50 border-amber-100 hover:bg-amber-100"
    },
    {
      title: "Margem de Lucro",
      value: `${Math.round(((data.totalRevenue - data.totalExpenses) / data.totalRevenue) * 100)}%`,
      icon: DollarSign,
      color: "bg-purple-50 border-purple-100 hover:bg-purple-100"
    },
    {
      title: "Faturas Pendentes",
      value: `${data.pendingInvoices}`,
      secondaryText: formatCurrency(data.pendingInvoices * 350), // Valor médio
      icon: AlertCircle,
      color: "bg-red-50 border-red-100 hover:bg-red-100"
    },
    {
      title: "Pagamentos em Atraso",
      value: `${data.outstandingPayments}`,
      secondaryText: formatCurrency(data.outstandingPayments * 275), // Valor médio
      icon: CreditCard,
      color: "bg-indigo-50 border-indigo-100 hover:bg-indigo-100"
    }
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <Card key={index} className={`transition-all duration-200 ${card.color}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{card.value}</div>
                  {card.secondaryText && (
                    <p className="text-xs text-muted-foreground">{card.secondaryText}</p>
                  )}
                  {card.trend && (
                    <div className="flex items-center mt-2 text-xs">
                      {card.trend.isPositive ? (
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                      )}
                      <span className={card.trend.isPositive ? "text-green-600" : "text-red-600"}>
                        {card.trend.isPositive ? "+" : ""}{card.trend.value}%
                      </span>
                    </div>
                  )}
                </div>
                <div className={`p-2 rounded-full ${card.color.replace('bg-', 'bg-opacity-70 bg-')}`}>
                  {React.createElement(card.icon, { className: "h-5 w-5 opacity-70" })}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FinancialStatsWidget;
