
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { FinancialTransaction } from '@/types/financial';
import TransactionFilters from './TransactionFilters';
import TransactionExport from './TransactionExport';
import TransactionTable from './TransactionTable';
import { translateTransactionType, translateTransactionStatus, getStatusColor, exportToCSV } from './utils/transactionUtils';

interface FinancialTransaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  date: string | Date;
  description?: string;
}

interface TransactionsTableProps {
  transactions: FinancialTransaction[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof FinancialTransaction>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Função para exportar dados
  const exportData = (format: 'csv' | 'pdf' | 'excel') => {
    if (format === 'csv') {
      exportToCSV(filteredTransactions, translateTransactionType, translateTransactionStatus);
    } else {
      alert(`Exportando dados em formato ${format}...`);
    }
  };

  // Ordenação
  const toggleSort = (field: keyof FinancialTransaction) => {
    setSortField(field);
  };

  // Filtragem e ordenação de transações
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(transaction => {
        // Filtro de pesquisa
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          (transaction.description?.toLowerCase().includes(searchLower) || false);
        
        // Filtro de status
        const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
        
        // Filtro de tipo
        const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
        
        return matchesSearch && matchesStatus && matchesType;
      })
      .sort((a, b) => {
        // Ordenação
        const fieldA = a[sortField];
        const fieldB = b[sortField];
        
        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return sortDirection === 'asc' 
            ? fieldA.localeCompare(fieldB) 
            : fieldB.localeCompare(fieldA);
        }
        
        if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
        }
        
        // Fallback para datas
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      });
  }, [transactions, searchTerm, statusFilter, typeFilter, sortField, sortDirection]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transações Financeiras</CardTitle>
        <CardDescription>Gerencie todas as transações financeiras do escritório</CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
        />
        
        <TransactionExport onExport={exportData} />
        
        <TransactionTable
          transactions={filteredTransactions}
          sortField={sortField}
          sortDirection={sortDirection}
          toggleSort={toggleSort}
          translateTransactionType={translateTransactionType}
          translateTransactionStatus={translateTransactionStatus}
          getStatusColor={getStatusColor}
        />
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;
