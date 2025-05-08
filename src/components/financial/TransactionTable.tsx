
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown } from 'lucide-react';

interface FinancialTransaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  date: string | Date;
  description?: string;
}

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
  getStatusColor,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] cursor-pointer" onClick={() => toggleSort('id')}>
              <div className="flex items-center">
                ID
                {sortField === 'id' && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort('amount')}>
              <div className="flex items-center">
                Valor
                {sortField === 'amount' && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort('type')}>
              <div className="flex items-center">
                Tipo
                {sortField === 'type' && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort('status')}>
              <div className="flex items-center">
                Status
                {sortField === 'status' && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort('date')}>
              <div className="flex items-center">
                Data
                {sortField === 'date' && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead>Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Nenhuma transação encontrada.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id} className="financial-table">
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell className="font-medium">
                  {transaction.amount.toLocaleString('pt-PT')}
                </TableCell>
                <TableCell>{translateTransactionType(transaction.type)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(transaction.status)}>
                    {translateTransactionStatus(transaction.status)}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(transaction.date).toLocaleDateString('pt-PT')}</TableCell>
                <TableCell className="max-w-[200px] truncate">{transaction.description || 'N/A'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
