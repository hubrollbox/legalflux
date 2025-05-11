
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, Calendar, CreditCard } from "lucide-react";

const FinancialAlerts = () => {
  const alerts = [
    {
      title: "Faturas a vencer",
      description: "3 faturas vencem nos próximos 7 dias",
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
      action: "Ver faturas"
    },
    {
      title: "Faturas vencidas",
      description: "2 faturas estão vencidas",
      icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      action: "Ver detalhes"
    },
    {
      title: "Pagamentos pendentes",
      description: "4 pagamentos aguardam aprovação",
      icon: <CreditCard className="h-5 w-5 text-blue-500" />,
      action: "Processar"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas Financeiros</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div key={index} className="flex items-start space-x-3 border-b border-gray-100 last:border-0 pb-3 last:pb-0">
              <div className="bg-gray-50 p-2 rounded-md">
                {alert.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{alert.title}</h4>
                <p className="text-sm text-gray-500">{alert.description}</p>
              </div>
              <button className="text-sm text-highlight hover:underline">
                {alert.action}
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialAlerts;
