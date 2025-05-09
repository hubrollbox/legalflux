
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Users, Clock, AlertTriangle, BadgeCheck } from 'lucide-react';
import { FinancialTransaction, TransactionStatus } from '@/types/financial';

interface FinancialAlertsProps {
  transactions: FinancialTransaction[];
}

const FinancialAlerts: React.FC<FinancialAlertsProps> = ({ transactions }) => {
  const [alerts, setAlerts] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const newAlerts: React.ReactNode[] = [];
    
    // Identificar transações pendentes
    const pendingTransactions = transactions.filter(
      t => t.status === TransactionStatus.PENDING
    );
    
    if (pendingTransactions.length > 0) {
      newAlerts.push(
        <Alert key="pending">
          <Clock className="h-4 w-4 text-amber-600" />
          <AlertTitle>Pagamentos Pendentes</AlertTitle>
          <AlertDescription>
            Existem {pendingTransactions.length} transação(ões) pendentes que requerem atenção.
          </AlertDescription>
        </Alert>
      );
    }
    
    // Identificar transações vencidas
    const overdueTransactions = transactions.filter(
      t => t.status === TransactionStatus.OVERDUE
    );
    
    if (overdueTransactions.length > 0) {
      newAlerts.push(
        <Alert key="overdue" variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Pagamentos em Atraso</AlertTitle>
          <AlertDescription>
            {overdueTransactions.length} pagamento(s) estão em atraso e requerem ação imediata.
          </AlertDescription>
        </Alert>
      );
    }
    
    // Pagamentos completados nos últimos 3 dias
    const recentPayments = transactions.filter(t => 
      t.status === TransactionStatus.COMPLETED &&
      new Date(t.date).getTime() > Date.now() - 3 * 24 * 60 * 60 * 1000
    );
    
    if (recentPayments.length > 0) {
      newAlerts.push(
        <Alert key="recent">
          <BadgeCheck className="h-4 w-4 text-green-600" />
          <AlertTitle>Pagamentos Recentes</AlertTitle>
          <AlertDescription>
            {recentPayments.length} pagamento(s) foram processados com sucesso nos últimos 3 dias.
          </AlertDescription>
        </Alert>
      );
    }
    
    // Alerta de cliente específico
    const clientGroups = transactions.reduce<Record<string, FinancialTransaction[]>>((acc, transaction) => {
      if (transaction.client) {
        if (!acc[transaction.client]) {
          acc[transaction.client] = [];
        }
        acc[transaction.client].push(transaction);
      }
      return acc;
    }, {});
    
    Object.entries(clientGroups).forEach(([client, clientTransactions]) => {
      const pendingAmount = clientTransactions
        .filter(t => t.status === TransactionStatus.PENDING || t.status === TransactionStatus.OVERDUE)
        .reduce((sum, t) => sum + t.amount, 0);
        
      if (pendingAmount > 1000) {
        newAlerts.push(
          <Alert key={`client-${client}`}>
            <Users className="h-4 w-4 text-amber-600" />
            <AlertTitle>Cliente com Valores Elevados Pendentes</AlertTitle>
            <AlertDescription>
              O cliente {client} tem {pendingAmount.toLocaleString('pt-PT')}€ em valores pendentes.
            </AlertDescription>
          </Alert>
        );
      }
    });
    
    setAlerts(newAlerts);
  }, [transactions]);
  
  if (alerts.length === 0) {
    return (
      <Alert>
        <BadgeCheck className="h-4 w-4 text-green-600" />
        <AlertTitle>Sem Alertas</AlertTitle>
        <AlertDescription>
          Não existem situações a reportar neste momento.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => (
        <React.Fragment key={`alert-${index}`}>{alert}</React.Fragment>
      ))}
    </div>
  );
};

export default FinancialAlerts;
