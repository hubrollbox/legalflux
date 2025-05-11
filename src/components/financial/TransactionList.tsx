
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileEdit, MoreHorizontal, Trash } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { FinancialTransaction } from '@/types/financial';
import { translateTransactionType, translateTransactionStatus, getStatusColor } from './utils/transactionUtils';

interface TransactionListProps {
  transactions: FinancialTransaction[];
  onViewDetails?: (transaction: FinancialTransaction) => void;
  onEditTransaction?: (transaction: FinancialTransaction) => void;
  onDeleteTransaction?: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onViewDetails,
  onEditTransaction,
  onDeleteTransaction
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Nenhuma transação encontrada
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onViewDetails?.(transaction)}>
                <TableCell>{new Date(transaction.date).toLocaleDateString('pt-PT')}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className={transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{translateTransactionType(transaction.type)}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(transaction.status)}>
                    {translateTransactionStatus(transaction.status)}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.clientName || '-'}</TableCell>
                <TableCell className="space-x-1">
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    onEditTransaction?.(transaction);
                  }}>
                    <FileEdit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTransaction?.(transaction.id);
                  }}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionList;
