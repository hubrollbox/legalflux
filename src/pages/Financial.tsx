'use client';

import '@/styles/Financial.css';

import { type ReactElement } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SectionHeader from '@/components/layout/SectionHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, TrendingUp, TrendingDown, ArrowUpRightFromSquare } from 'lucide-react';
import { ResponsiveBar } from '@nivo/bar';

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
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader title="Financeiro" description="Gerencie as finanças do seu escritório" />
      </div>

      <Tabs defaultValue="faturacao" className="w-full mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="faturacao">Faturação</TabsTrigger>
          <TabsTrigger value="honorarios">Honorários</TabsTrigger>
        </TabsList>

        <TabsContent value="faturacao" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Faturamento e Cobrança</CardTitle>
              <CardDescription>Gestão de faturamento e cobrança automatizada</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <Button>Gerar Nova Fatura</Button>
              <Button variant="outline">Exportar Dados</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="honorarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Honorários</CardTitle>
              <CardDescription>Defina e monitorize honorários por processo, cliente ou tipo de serviço</CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Configurar Honorários</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Receitas</p>
              <h3 className="text-2xl font-bold mt-1">€32.500</h3>
              <div className="flex items-center mt-1 text-green-500 text-sm">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+8%</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <ArrowUpRightFromSquare className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Despesas</p>
              <h3 className="text-2xl font-bold mt-1">€21.000</h3>
              <div className="flex items-center mt-1 text-red-500 text-sm">
                <TrendingDown className="h-3 w-3 mr-1" />
                <span>-5%</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <ArrowUpRightFromSquare className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Receitas Mensais</h3>
          <div className="chart-container">
            <ResponsiveBar
              data={revenueData}
              keys={["value"]}
              indexBy="month"
              margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
              padding={0.3}
              colors="#3b82f6"
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Mês",
                legendPosition: "middle",
                legendOffset: 40,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Valor (€)",
                legendPosition: "middle",
                legendOffset: -40,
                format: (value) => `€${value}`,
              }}
              enableGridY={true}
              labelSkipWidth={12}
              labelSkipHeight={12}
              label={(d) => `€${d.value}`}
              role="application"
              ariaLabel="Gráfico de receitas mensais"
            />
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Despesas Mensais</h3>
          <div className="chart-container-expenses">
            <ResponsiveBar
              data={expenseData}
              keys={["value"]}
              indexBy="month"
              margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
              padding={0.3}
              colors="#ef4444"
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Mês",
                legendPosition: "middle",
                legendOffset: 40,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Valor (€)",
                legendPosition: "middle",
                legendOffset: -40,
                format: (value) => `€${value}`,
              }}
              enableGridY={true}
              labelSkipWidth={12}
              labelSkipHeight={12}
              label={(d) => `€${d.value}`}
              role="application"
              ariaLabel="Gráfico de despesas mensais"
            />
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Financial;
