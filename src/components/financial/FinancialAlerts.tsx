
import React from "react";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertCircle, Check, X } from "lucide-react";

interface FinancialAlertProps {
  id: string;
  title: string;
  description: string;
  type: "payment" | "invoice" | "notice";
  status: "pending" | "due" | "overdue" | "paid";
  amount?: number;
  date?: string;
}

export const FinancialAlerts: React.FC = () => {
  const handlePaymentNotification = (alert: FinancialAlertProps) => {
    toast({
      title: `Pagamento ${alert.status === "paid" ? "efetuado" : "agendado"}`,
      description: `${alert.title} - ${alert.amount?.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
      })}`,
      duration: 5000,
    });
  };

  const handleDismissAlert = (id: string) => {
    // Aqui você removeria o alerta do estado/banco de dados
    toast({
      title: "Alerta ignorado",
      description: "Este alerta não será mais mostrado.",
      duration: 3000,
    });
  };

  // Dados simulados de alertas
  const alerts: FinancialAlertProps[] = [
    {
      id: "1",
      title: "Fatura #2023-089",
      description: "Pagamento pendente - Cliente: Empresa ABC",
      type: "invoice",
      status: "due",
      amount: 1250.0,
      date: "2025-05-15",
    },
    {
      id: "2",
      title: "Declaração IRS",
      description: "Prazo limite em 5 dias",
      type: "notice",
      status: "pending",
      date: "2025-05-20",
    },
    {
      id: "3",
      title: "Honorários Processo #P-2023-045",
      description: "Recebimento confirmado",
      type: "payment",
      status: "paid",
      amount: 3450.0,
      date: "2025-05-09",
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Notificações Financeiras</h3>

      {alerts.length === 0 ? (
        <Card>
          <CardContent className="py-4 text-center text-muted-foreground">
            Não há notificações financeiras pendentes.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              className="flex items-start justify-between"
              variant={alert.status === "overdue" ? "destructive" : "default"}
            >
              <div className="flex gap-2">
                {alert.type === "payment" && (
                  <Check className="h-5 w-5 mt-0.5 text-green-500" />
                )}
                {alert.type === "invoice" && (
                  <AlertCircle className="h-5 w-5 mt-0.5 text-amber-500" />
                )}
                {alert.type === "notice" && (
                  <Bell className="h-5 w-5 mt-0.5 text-blue-500" />
                )}
                <div>
                  <AlertTitle>{alert.title}</AlertTitle>
                  <AlertDescription className="flex flex-col">
                    <span>{alert.description}</span>
                    {alert.amount && (
                      <span className="font-semibold">
                        {alert.amount.toLocaleString("pt-PT", {
                          style: "currency",
                          currency: "EUR",
                        })}
                      </span>
                    )}
                    {alert.date && (
                      <span className="text-xs text-muted-foreground mt-1">
                        {new Date(alert.date).toLocaleDateString("pt-PT")}
                      </span>
                    )}
                  </AlertDescription>
                </div>
              </div>
              <div className="flex gap-2 ml-4 shrink-0">
                {(alert.type === "invoice" || alert.type === "payment") && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePaymentNotification(alert)}
                  >
                    {alert.status === "paid"
                      ? "Ver detalhes"
                      : "Agendar pagamento"}
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDismissAlert(alert.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinancialAlerts;
