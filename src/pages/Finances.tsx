'use client';
import { type ReactElement } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, TrendingUp, ArrowUpRightFromSquare, ArrowUpRight } from 'lucide-react';lucide-react';
import { ResponsiveBar } from '@nivo/bar';

const revenueData = [
  { month: 'Jan', value: 4500 },
  { month: 'Fev', value: 5200 },
  { month: 'Mar', value: 4800 },
  { month: 'Abr', value: 5800 },
  { month: 'Mai', value: 6300 },
  { month: 'Jun', value: 5900 },
];

const Finance = () => {
  return (
    <div className="container py-6 space-y-6">
      <PageHeader title="Finanças" description="Gerencie faturamento, honorários e análise financeira" />

      <Tabs defaultValue="faturacao" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="faturacao">Faturação</TabsTrigger>
          <TabsTrigger value="honorarios">Honorários</TabsTrigger>
        </TabsList>

        <TabsContent value="faturacao" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <BarChart size={20} />
                  </div>
                  <CardTitle>Faturamento e Cobrança</CardTitle>
                </div>
                <CardDescription>Gestão de faturamento e cobrança automatizada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Funcionalidades</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Geração automática de faturas</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Integração com sistemas de pagamento</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Previsão de fluxo de caixa</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Relatórios financeiros detalhados</span>
                      </li>
                    </ul>
                  </div>
                  <Button>Gerar Nova Fatura</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="honorarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestão de Honorários</CardTitle>
              <CardDescription>Defina e monitorize honorários por processo, cliente ou tipo de serviço</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button>Configurar Honorários</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Receitas Mensais</h3>
          <div style={{ height: 300 }}>
            <ResponsiveBar
              data={revenueData}
              keys={['value']}
              indexBy="month"
              margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
              padding={0.3}
              colors="#3b82f6"
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Mês',
                legendPosition: 'middle',
                legendOffset: 40,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Valor (€)',
                legendPosition: 'middle',
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
      </div>
    </div>
  );
};

export default Finance;