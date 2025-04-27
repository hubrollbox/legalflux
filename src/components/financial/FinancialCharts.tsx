import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { FinancialTransaction } from '@/types';

interface FinancialChartsProps {
  transactions: FinancialTransaction[];
  revenueData: { month: string; value: number }[];
  expenseData: { month: string; value: number }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const FinancialCharts: React.FC<FinancialChartsProps> = ({ 
  revenueData, 
  expenseData 
}) => {
  const [timeRange, setTimeRange] = useState('6m');
  
  // Dados combinados para o gráfico de área
  const combinedData = revenueData.map((item, index) => ({
    month: item.month,
    receita: item.value,
    despesa: expenseData[index]?.value || 0,
    lucro: item.value - (expenseData[index]?.value || 0)
  }));

  // Dados para o gráfico de pizza
  const pieData = [
    { name: 'Honorários', value: 12500 },
    { name: 'Custas', value: 8500 },
    { name: 'Consultas', value: 6200 },
    { name: 'Outros', value: 4800 },
  ];

  // Dados para previsão financeira
  const forecastData = [
    { month: 'Jul', atual: 6500, previsao: 7000 },
    { month: 'Ago', atual: 0, previsao: 7200 },
    { month: 'Set', atual: 0, previsao: 7500 },
    { month: 'Out', atual: 0, previsao: 7800 },
    { month: 'Nov', atual: 0, previsao: 8100 },
    { month: 'Dez', atual: 0, previsao: 8500 },
  ];

  // Filtrar dados baseado no intervalo de tempo selecionado
  const filterDataByTimeRange = (data: any[]) => {
    switch(timeRange) {
      case '3m':
        return data.slice(-3);
      case '6m':
        return data;
      case '1y':
        return [...data, ...forecastData.slice(0, 6)];
      default:
        return data;
    }
  };

  const filteredCombinedData = filterDataByTimeRange(combinedData);
  const filteredForecastData = filterDataByTimeRange([...combinedData.slice(-1), ...forecastData]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Análise Financeira</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecionar período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Últimos 3 meses</SelectItem>
            <SelectItem value="6m">Últimos 6 meses</SelectItem>
            <SelectItem value="1y">Projeção anual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="revenue">Receitas</TabsTrigger>
          <TabsTrigger value="expenses">Despesas</TabsTrigger>
          <TabsTrigger value="forecast">Previsão</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Receitas vs Despesas</CardTitle>
              <CardDescription>Comparativo mensal de receitas e despesas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={filteredCombinedData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${value}`} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="receita" 
                      stackId="1"
                      stroke="#82ca9d" 
                      fill="#82ca9d" 
                      name="Receita"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="despesa" 
                      stackId="2"
                      stroke="#ff8042" 
                      fill="#ff8042" 
                      name="Despesa"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="lucro" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      name="Lucro"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Receitas</CardTitle>
                <CardDescription>Por categoria de serviço</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `€${value}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tendência de Lucro</CardTitle>
                <CardDescription>Evolução mensal do lucro</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={filteredCombinedData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `€${value}`} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="lucro" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        name="Lucro"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Receitas</CardTitle>
              <CardDescription>Detalhamento mensal de receitas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredCombinedData}
                    margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${value}`} />
                    <Legend />
                    <Bar dataKey="receita" name="Receita" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Despesas</CardTitle>
              <CardDescription>Detalhamento mensal de despesas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredCombinedData}
                    margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${value}`} />
                    <Legend />
                    <Bar dataKey="despesa" name="Despesa" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Previsão Financeira</CardTitle>
              <CardDescription>Projeção de receitas para os próximos meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredForecastData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `€${value}`} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="atual" 
                      stroke="#82ca9d" 
                      strokeWidth={2}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }} 
                      name="Receita Atual"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="previsao" 
                      stroke="#8884d8" 
                      strokeDasharray="5 5"
                      strokeWidth={2}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }} 
                      name="Previsão"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialCharts;