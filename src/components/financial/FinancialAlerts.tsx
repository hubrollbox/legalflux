import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { FinancialTransaction } from '@/types';
import { AlertCircle, Clock, Calendar, Bell } from 'lucide-react';

interface FinancialAlertsProps {
  transactions: FinancialTransaction[];
}

const FinancialAlerts: React.FC<FinancialAlertsProps> = ({ transactions }) => {
  // Filtrar transações pendentes
  const pendingTransactions = transactions
    .filter(t => t.status === 'pending')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calcular transações atrasadas (mais de 30 dias)
  const overdueTransactions = transactions.filter(t => {
    if (t.status !== 'pending') return false;
    const transactionDate = new Date(t.date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - transactionDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 30;
  });

  // Calcular transações próximas do vencimento (próximos 7 dias)
  const upcomingTransactions = transactions.filter(t => {
    if (t.status !== 'pending') return false;
    const transactionDate = new Date(t.date);
    const today = new Date();
    const diffTime = transactionDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 7;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Alertas Financeiros
        </CardTitle>
        <CardDescription>
          Notificações importantes sobre pagamentos pendentes e vencimentos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {overdueTransactions.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Pagamentos Atrasados</AlertTitle>
            <AlertDescription>
              Existem {overdueTransactions.length} pagamentos atrasados no valor total de 
              €{overdueTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString('pt-PT')}.
            </AlertDescription>
            <div className="mt-2">
              {overdueTransactions.slice(0, 3).map(transaction => (
                <div key={transaction.id} className="flex justify-between items-center mt-2 p-2 bg-red-50 rounded-md">
                  <div>
                    <p className="font-medium">{transaction.clientId}</p>
                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">€{transaction.amount.toLocaleString('pt-PT')}</p>
                    <p className="text-sm text-red-600">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {new Date(transaction.date).toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                </div>
              ))}
              {overdueTransactions.length > 3 && (
                <Button variant="link" className="mt-2 p-0 h-auto">
                  Ver todos os {overdueTransactions.length} pagamentos atrasados
                </Button>
              )}
            </div>
          </Alert>
        )}

        {upcomingTransactions.length > 0 && (
          <Alert>
            <Calendar className="h-4 w-4" />
            <AlertTitle>Pagamentos a Vencer</AlertTitle>
            <AlertDescription>
              Existem {upcomingTransactions.length} pagamentos a vencer nos próximos 7 dias no valor total de 
              €{upcomingTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString('pt-PT')}.
            </AlertDescription>
            <div className="mt-2">
              {upcomingTransactions.slice(0, 3).map(transaction => (
                <div key={transaction.id} className="flex justify-between items-center mt-2 p-2 bg-blue-50 rounded-md">
                  <div>
                    <p className="font-medium">{transaction.clientId}</p>
                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">€{transaction.amount.toLocaleString('pt-PT')}</p>
                    <p className="text-sm text-blue-600">
                      <Calendar className="inline h-3 w-3 mr-1" />
                      {new Date(transaction.date).toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                </div>
              ))}
              {upcomingTransactions.length > 3 && (
                <Button variant="link" className="mt-2 p-0 h-auto">
                  Ver todos os {upcomingTransactions.length} pagamentos a vencer
                </Button>
              )}
            </div>
          </Alert>
        )}

        {pendingTransactions.length === 0 && (
          <div className="text-center py-6">
            <Bell className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-2 text-muted-foreground">Não há alertas financeiros no momento.</p>
          </div>
        )}

        {pendingTransactions.length > 0 && overdueTransactions.length === 0 && upcomingTransactions.length === 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Pagamentos Pendentes</AlertTitle>
            <AlertDescription>
              Existem {pendingTransactions.length} pagamentos pendentes no valor total de 
              €{pendingTransactions.reduce((sum, t) => sum + t.amount, 0).toLocaleString('pt-PT')}.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialAlerts;