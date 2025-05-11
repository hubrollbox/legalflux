
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionList from './TransactionList';
import TransactionFilters from './TransactionFilters';
import TransactionExport from './TransactionExport';
import { useState } from 'react';
import { FinancialTransaction } from "@/types/financial";

// Mock de transações para demonstração
const MOCK_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: '1',
    amount: 1500.00,
    description: 'Honorários - Processo Judicial 123/2023',
    status: 'paid',
    type: 'income',
    client: 'João Silva',
    process: '123/2023',
    date: '2023-10-15T10:30:00Z',
    createdAt: '2023-10-15T10:30:00Z'
  },
  {
    id: '2',
    amount: -250.50,
    description: 'Despesas de Deslocação - Tribunal',
    status: 'completed',
    type: 'expense',
    process: '123/2023',
    date: '2023-10-14T14:45:00Z',
    createdAt: '2023-10-14T14:45:00Z'
  },
  {
    id: '3',
    amount: 2000.00,
    description: 'Honorários - Consultoria Empresarial',
    status: 'pending',
    type: 'income',
    client: 'Empresa ABC, Lda.',
    date: '2023-10-13T09:15:00Z',
    createdAt: '2023-10-13T09:15:00Z'
  },
  {
    id: '4',
    amount: -120.00,
    description: 'Material de Escritório',
    status: 'completed',
    type: 'expense',
    date: '2023-10-10T16:20:00Z',
    createdAt: '2023-10-10T16:20:00Z'
  },
  {
    id: '5',
    amount: 750.00,
    description: 'Avaliação de Contratos',
    status: 'pending',
    type: 'income',
    client: 'Maria Oliveira',
    date: '2023-10-08T11:00:00Z',
    createdAt: '2023-10-08T11:00:00Z'
  }
];

// Função auxiliar para recuperar transações
const getTransactionsByUser = (): FinancialTransaction[] => {
  return MOCK_TRANSACTIONS;
};

export const FinancialReports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const transactions: FinancialTransaction[] = getTransactionsByUser();
  
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
