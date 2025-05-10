
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Sample alert data
const alerts = [
  { 
    id: '1', 
    title: 'Prazo de pagamento próximo', 
    description: 'Fatura #INV-2023-001 vence em 3 dias',
    type: 'warning'
  },
  { 
    id: '2',
    title: 'Pagamento recebido',
    description: 'R$ 5.000,00 recebido de Cliente XYZ',
    type: 'success'
  }
];

export const FinancialAlerts = () => {
  const { toast } = useToast();

  const handleDismiss = (id: string) => {
    toast({
      title: "Alerta descartado",
      description: "O alerta foi removido com sucesso."
    });
  };

  const handleAction = (id: string) => {
    toast({
      title: "Ação executada",
      description: "A ação foi realizada com sucesso."
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Alertas Financeiros</h3>
      
      {alerts.map((alert) => (
        <Card key={alert.id} className={
          alert.type === 'warning' ? "border-yellow-300 bg-yellow-50" : 
          alert.type === 'success' ? "border-green-300 bg-green-50" : 
          "border-red-300 bg-red-50"
        }>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">{alert.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-2">
            <p className="text-sm text-gray-600">{alert.description}</p>
          </CardContent>
          <CardFooter className="pt-0 flex justify-end gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => handleDismiss(alert.id)}
            >
              Descartar
            </Button>
            <Button 
              size="sm" 
              onClick={() => handleAction(alert.id)}
            >
              Ver Detalhes
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      {alerts.length === 0 && (
        <p className="text-sm text-gray-500">Não há alertas financeiros no momento.</p>
      )}
    </div>
  );
};

export default FinancialAlerts;
