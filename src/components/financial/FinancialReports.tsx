
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionList from './TransactionList';
import TransactionFilters from './TransactionFilters';
import TransactionExport from './TransactionExport';
import { getTransactionsByUser, FinancialTransaction } from '@/services/mockData';
import { useState } from 'react';

export const FinancialReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const transactions: FinancialTransaction[] = getTransactionsByUser().map(t => ({
    ...t,
    createdAt: t.createdAt || new Date().toISOString()
  }));
  
  // Filter transactions
  const filteredTransactions = transactions.filter((transaction: FinancialTransaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const handleExport = (format: 'csv' | 'pdf' | 'excel') => {
    alert(`Exportando em formato ${format}...`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transações Financeiras</CardTitle>
        <CardDescription>Visualize e gerencie todas as transações do seu escritório</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transactions">
          <TabsList className="mb-4">
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="invoices">Faturas</TabsTrigger>
            <TabsTrigger value="expenses">Despesas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions">
            <TransactionFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
            />
            
            <TransactionExport onExport={handleExport} />
            
            <TransactionList 
              transactions={filteredTransactions} 
              onViewDetails={(transaction) => alert(`Visualizando detalhes da transação: ${transaction.description}`)}
              onEditTransaction={(transaction) => alert(`Editando transação: ${transaction.description}`)}
              onDeleteTransaction={(id) => alert(`Excluindo transação: ${id}`)}
            />
          </TabsContent>
          
          <TabsContent value="invoices">
            <p className="text-center text-gray-500 py-8">
              Módulo de Faturas em desenvolvimento
            </p>
          </TabsContent>
          
          <TabsContent value="expenses">
            <p className="text-center text-gray-500 py-8">
              Módulo de Despesas em desenvolvimento
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FinancialReports;
