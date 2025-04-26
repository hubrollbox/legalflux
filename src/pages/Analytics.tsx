import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SectionHeader from '@/components/layout/SectionHeader';
import AdvancedAnalytics from '@/components/analytics/AdvancedAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Case, FinancialTransaction, Task, User } from '@/types';
import { MOCK_CASES, MOCK_FINANCIAL_TRANSACTIONS, MOCK_TASKS, MOCK_USERS } from '@/services/mockData';
import { BarChart2, FileText, PieChart, TrendingUp, Users } from 'lucide-react';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('advanced');
  const [cases, setCases] = useState<Case[]>([]);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // Load mock data with improved error handling
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In a real scenario, this data would come from an API
        setCases(MOCK_CASES);
        setTransactions(MOCK_FINANCIAL_TRANSACTIONS);
        setTasks(MOCK_TASKS);
        setUsers(MOCK_USERS);
      } catch (error) {
        setError('Failed to load analytics data. Please try again later.');
        console.error("Error loading analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader 
          title="Análise de Dados" 
          description="Visualize métricas importantes e gere relatórios personalizados para tomar decisões baseadas em dados" 
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="advanced">Análise Avançada</TabsTrigger>
          <TabsTrigger value="reports">Relatórios Predefinidos</TabsTrigger>
          <TabsTrigger value="export">Exportação de Dados</TabsTrigger>
        </TabsList>

        {/* Tab de Análise Avançada */}
        <TabsContent value="advanced" className="space-y-6">
          {isLoading ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Loading analytics data...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
              <div className="text-destructive text-center p-4 rounded-md bg-destructive/10">
                {error}
              </div>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </div>
          ) : (
            <AdvancedAnalytics 
              cases={cases}
              transactions={transactions}
              tasks={tasks}
              users={users}
            />
          )}
        </TabsContent>

        {/* Tab de Relatórios Predefinidos */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-6 text-center">
                <BarChart2 className="h-10 w-10 mx-auto mb-2 text-blue-500" />
                <h3 className="font-medium mb-1">Desempenho de Advogados</h3>
                <p className="text-sm text-muted-foreground mb-4">Análise comparativa de produtividade</p>
                <Button className="w-full">Gerar Relatório</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-6 text-center">
                <PieChart className="h-10 w-10 mx-auto mb-2 text-green-500" />
                <h3 className="font-medium mb-1">Análise Financeira</h3>
                <p className="text-sm text-muted-foreground mb-4">Receitas, despesas e lucratividade</p>
                <Button className="w-full">Gerar Relatório</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-10 w-10 mx-auto mb-2 text-purple-500" />
                <h3 className="font-medium mb-1">Tendências de Processos</h3>
                <p className="text-sm text-muted-foreground mb-4">Evolução e distribuição de casos</p>
                <Button className="w-full">Gerar Relatório</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-6 text-center">
                <Users className="h-10 w-10 mx-auto mb-2 text-amber-500" />
                <h3 className="font-medium mb-1">Análise de Clientes</h3>
                <p className="text-sm text-muted-foreground mb-4">Perfil e comportamento de clientes</p>
                <Button className="w-full">Gerar Relatório</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
              <CardContent className="p-6 text-center">
                <FileText className="h-10 w-10 mx-auto mb-2 text-red-500" />
                <h3 className="font-medium mb-1">Relatório Operacional</h3>
                <p className="text-sm text-muted-foreground mb-4">Métricas de operação do escritório</p>
                <Button className="w-full">Gerar Relatório</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Exportação de Dados */}
        <TabsContent value="export" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Exportação de Dados</CardTitle>
              <CardDescription>
                Exporte dados brutos para análise em ferramentas externas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tipo de Dados</label>
                  <Select defaultValue="processos">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo de dados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="processos">Processos</SelectItem>
                      <SelectItem value="financeiro">Dados Financeiros</SelectItem>
                      <SelectItem value="tarefas">Tarefas</SelectItem>
                      <SelectItem value="clientes">Clientes</SelectItem>
                      <SelectItem value="advogados">Advogados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Formato</label>
                  <Select defaultValue="excel">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar formato" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Período</label>
                  <Select defaultValue="ultimo-mes">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ultimo-mes">Último mês</SelectItem>
                      <SelectItem value="ultimo-trimestre">Último trimestre</SelectItem>
                      <SelectItem value="ultimo-ano">Último ano</SelectItem>
                      <SelectItem value="personalizado">Período personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Filtros Adicionais</label>
                  <Select defaultValue="todos">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar filtros" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os dados</SelectItem>
                      <SelectItem value="ativos">Apenas ativos</SelectItem>
                      <SelectItem value="concluidos">Apenas concluídos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-end">
                <Button variant="outline" className="sm:w-auto">
                  Visualizar Prévia
                </Button>
                <Button className="sm:w-auto">
                  Exportar Dados
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Analytics;