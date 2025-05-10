import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SectionHeader from '@/components/layout/SectionHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { DollarSign, Download, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TransactionList from '@/components/financial/TransactionList';
import TransactionFilters from '@/components/financial/TransactionFilters';
import TransactionExport from '@/components/financial/TransactionExport';
import FinancialCard from '@/components/financial/FinancialCard';
import FinancialAlerts from '@/components/financial/FinancialAlerts';
import { FinancialReports } from '@/components/financial/FinancialReports';

const Financial = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const { toast } = useToast();

  const sampleTransactions = [
    {
      id: '1',
      date: '2023-01-15',
      description: 'Fatura #2023-001',
      amount: 1500,
      type: 'income',
      status: 'completed',
      category: 'Serviços Jurídicos',
      clientName: 'Empresa ABC',
      processId: 'P-2023-001',
    },
    {
      id: '2',
      date: '2023-02-20',
      description: 'Despesa com aluguel',
      amount: -800,
      type: 'expense',
      status: 'completed',
      category: 'Despesas Operacionais',
      clientName: null,
      processId: null,
    },
    {
      id: '3',
      date: '2023-03-10',
      description: 'Pagamento - Caso XYZ',
      amount: 2200,
      type: 'income',
      status: 'pending',
      category: 'Serviços Jurídicos',
      clientName: 'Cliente XYZ',
      processId: 'P-2023-002',
    },
  ];

  const financialData = [
    { month: 'Jan', receitas: 4000, despesas: 2400 },
    { month: 'Fev', receitas: 3000, despesas: 1398 },
    { month: 'Mar', receitas: 2000, despesas: 9800 },
    { month: 'Abr', receitas: 2780, despesas: 3908 },
    { month: 'Mai', receitas: 1890, despesas: 4800 },
    { month: 'Jun', receitas: 2390, despesas: 3800 },
    { month: 'Jul', receitas: 3490, despesas: 4300 },
  ];

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Financeiro"
          description="Gerencie as finanças do seu escritório de advocacia"
        />
        <Button className="bg-highlight hover:bg-highlight/90">
          <Plus className="mr-2 h-4 w-4" /> Nova Transação
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <FinancialCard
          title="Receita Total"
          value="R$ 85.000,00"
          change="+12%"
          isPositive={true}
          icon={<DollarSign className="h-5 w-5" />}
          description="Comparado ao mês anterior"
        />
        <FinancialCard
          title="Despesas Mensais"
          value="R$ 12.500,00"
          change="-5%"
          isPositive={false}
          icon={<DollarSign className="h-5 w-5" />}
          description="Comparado ao mês anterior"
        />
        <FinancialCard
          title="Faturas Pendentes"
          value="R$ 5.200,00"
          change="+3%"
          isPositive={false}
          icon={<DollarSign className="h-5 w-5" />}
          description="Aguardando pagamento"
        />
        <FinancialCard
          title="Média por fatura"
          value="R$ 1.250,00"
          change="+8%"
          isPositive={true}
          icon={<DollarSign className="h-5 w-5" />}
          description="Valor médio das faturas"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Receitas vs Despesas</CardTitle>
              <CardDescription>Visão geral das receitas e despesas mensais</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="receitas" fill="#82ca9d" />
                  <Bar dataKey="despesas" fill="#e48383" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <FinancialAlerts />
        </div>
      </div>

      <div className="mt-6">
        <FinancialReports />
      </div>
    </DashboardLayout>
  );
};

export default Financial;
