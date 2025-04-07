'use client';

import '@/styles/Financial.css';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SectionHeader from '@/components/layout/SectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { FinancialTransaction } from '@/types';
import { MOCK_FINANCIAL_TRANSACTIONS, getTransactionsByUser } from '@/services/mockData';
import { Download, Filter, Search, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

// Componentes financeiros
import FinancialDashboard from '@/components/financial/FinancialDashboard';
import ImprovedFinancialDashboard from '@/components/financial/ImprovedFinancialDashboard';
import FinancialCharts from '@/components/financial/FinancialCharts';
import TransactionsTable from '@/components/financial/TransactionsTable';
import FinancialAlerts from '@/components/financial/FinancialAlerts';
import FinancialReports from '@/components/financial/FinancialReports';

// Dados para os gráficos
const revenueData = [
  { month: 'Jan', value: 4500 },
  { month: 'Fev', value: 5200 },
  { month: 'Mar', value: 4800 },
  { month: 'Abr', value: 5800 },
  { month: 'Mai', value: 6300 },
  { month: 'Jun', value: 5900 },
];

const expenseData = [
  { month: 'Jan', value: 3000 },
  { month: 'Fev', value: 3500 },
  { month: 'Mar', value: 3200 },
  { month: 'Abr', value: 4000 },
  { month: 'Mai', value: 4200 },
  { month: 'Jun', value: 3900 },
];

const Financial = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Simular carregamento de transações
  useEffect(() => {
    // Em um cenário real, você buscaria os dados do backend
    // Aqui estamos usando dados mockados
    setTransactions(MOCK_FINANCIAL_TRANSACTIONS);
  }, []);

  // Filtrar transações
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchTerm === '' || 
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.clientName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || transaction.type === filterType;

    const matchesDate = !dateRange ||
      (new Date(transaction.date) >= dateRange.from &&
       new Date(transaction.date) <= dateRange.to);

    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader 
          title="Financeiro" 
          description="Gerencie as finanças do seu escritório com análises detalhadas e relatórios personalizados" 
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 mt-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar transações..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="payment">Pagamentos</SelectItem>
            <SelectItem value="invoice">Faturas</SelectItem>
            <SelectItem value="refund">Reembolsos</SelectItem>
          </SelectContent>
        </Select>

        <DatePickerWithRange
          value={dateRange}
          onChange={(value) => setDateRange(value as { from: Date; to: Date })}
        />
      </div>

      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="faturacao">Faturação</TabsTrigger>
          <TabsTrigger value="honorarios">Honorários</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Dashboard Financeiro Melhorado */}
          <ImprovedFinancialDashboard transactions={transactions} />
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <TransactionsTable transactions={transactions} />
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <FinancialReports transactions={transactions} />
        </TabsContent>

        {/* Faturação Tab */}
        <TabsContent value="faturacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Faturamento e Cobrança</CardTitle>
              <CardDescription>Gestão de faturamento e cobrança automatizada</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="space-y-2 w-full sm:w-auto">
                <Button className="w-full sm:w-auto">Gerar Nova Fatura</Button>
                <Button variant="outline" className="w-full sm:w-auto">Exportar Dados</Button>
              </div>
              
              <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Resumo de Faturamento</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Faturas Emitidas:</div>
                      <div className="text-right font-medium">24</div>
                      <div>Valor Total:</div>
                      <div className="text-right font-medium">€32.500</div>
                      <div>Pendentes:</div>
                      <div className="text-right font-medium text-amber-600">€8.200</div>
                      <div>Recebidas:</div>
                      <div className="text-right font-medium text-green-600">€24.300</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Faturamento</CardTitle>
              <CardDescription>Personalize suas configurações de faturamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Modelos de Fatura</h3>
                    <p className="text-sm text-muted-foreground mb-2">Personalize os modelos de fatura do seu escritório</p>
                    <Button variant="outline" size="sm">Gerenciar Modelos</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Automação de Cobrança</h3>
                    <p className="text-sm text-muted-foreground mb-2">Configure lembretes automáticos para pagamentos</p>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Honorários Tab */}
        <TabsContent value="honorarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Honorários</CardTitle>
              <CardDescription>Defina e monitorize honorários por processo, cliente ou tipo de serviço</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button>Configurar Honorários</Button>
                <Button variant="outline">Ver Tabela de Honorários</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Por Hora</h3>
                    <p className="text-sm text-muted-foreground mb-2">Defina valores por hora trabalhada</p>
                    <div className="text-2xl font-bold">€150<span className="text-sm font-normal">/hora</span></div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Por Processo</h3>
                    <p className="text-sm text-muted-foreground mb-2">Defina valores fixos por tipo de processo</p>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Pacotes de Serviços</h3>
                    <p className="text-sm text-muted-foreground mb-2">Crie pacotes de serviços com valores predefinidos</p>
                    <Button variant="outline" size="sm">Gerenciar Pacotes</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Financial;
