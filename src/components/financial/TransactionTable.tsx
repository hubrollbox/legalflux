
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Pencil, Trash } from "lucide-react";
import { FinancialTransaction } from '@/types/financial';
import { formatCurrency } from '@/utils/formatters';

interface TransactionTableProps {
  transactions: FinancialTransaction[];
  sortField: keyof FinancialTransaction;
  sortDirection: 'asc' | 'desc';
  toggleSort: (field: keyof FinancialTransaction) => void;
  translateTransactionType: (type: string) => string;
  translateTransactionStatus: (status: string) => string;
  getStatusColor: (status: string) => string;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  sortField,
  sortDirection,
  toggleSort,
  translateTransactionType,
  translateTransactionStatus,
  getStatusColor
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => toggleSort('date')}>
              Data {sortField === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort('description')}>
              Descrição {sortField === 'description' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort('amount')}>
              Valor {sortField === 'amount' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
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
              <TableRow key={transaction.id}>
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
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
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

export default TransactionTable;
