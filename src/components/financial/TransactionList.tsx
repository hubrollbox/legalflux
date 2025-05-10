
import React from 'react';
import { FinancialTransaction } from "@/types/financial";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, FileText } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface TransactionListProps {
  transactions: FinancialTransaction[];
  onViewTransaction?: (transaction: FinancialTransaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onViewTransaction }) => {
  // Helper function to get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to translate transaction type
  const translateTransactionType = (type: string): string => {
    const translations: Record<string, string> = {
      'income': 'Receita',
      'expense': 'Despesa',
      'invoice': 'Fatura',
      'payment': 'Pagamento',
      'refund': 'Reembolso',
      'other': 'Outro'
    };
    return translations[type] || type;
  };

  // Helper function to translate transaction status
  const translateTransactionStatus = (status: string): string => {
    const translations: Record<string, string> = {
      'completed': 'Concluído',
      'pending': 'Pendente',
      'failed': 'Falhou',
      'cancelled': 'Cancelado',
      'refunded': 'Reembolsado',
      'overdue': 'Vencido'
    };
    return translations[status] || status;
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-mono text-xs">
                  {transaction.id.substring(0, 8)}...
                </TableCell>
                <TableCell>{transaction.description || "—"}</TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString("pt-PT")}</TableCell>
                <TableCell className={transaction.amount >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>{translateTransactionType(transaction.type)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(transaction.status)}>
                    {translateTransactionStatus(transaction.status)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onViewTransaction && onViewTransaction(transaction)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                Nenhuma transação encontrada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionList;
