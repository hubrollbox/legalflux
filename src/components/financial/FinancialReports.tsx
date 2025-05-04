import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { FinancialTransaction } from '@/types';
import { Download, FileText, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

interface FinancialReportsProps {
  transactions: FinancialTransaction[];
}

const FinancialReports: React.FC<FinancialReportsProps> = () => {
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [groupBy, setGroupBy] = useState('month');

  // Função para gerar relatório
  const generateReport = (format: 'pdf' | 'excel' | 'csv') => {
    // Implementação real dependeria de bibliotecas como jspdf, xlsx, etc.
    alert(`Gerando relatório ${reportType} em formato ${format}...`);
  };

  // Função para formatar a data
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, 'P', { locale: pt });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Relatórios Financeiros
        </CardTitle>
        <CardDescription>
          Gere relatórios detalhados para análise financeira
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="standard" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="standard">Relatórios Padrão</TabsTrigger>
            <TabsTrigger value="custom">Relatórios Personalizados</TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-6 text-center">
                  <FileText className="h-10 w-10 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-medium mb-1">Relatório Mensal</h3>
                  <p className="text-sm text-muted-foreground mb-4">Resumo financeiro do mês atual</p>
                  <Button onClick={() => generateReport('pdf')} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-6 text-center">
                  <FileText className="h-10 w-10 mx-auto mb-2 text-green-500" />
                  <h3 className="font-medium mb-1">Relatório Trimestral</h3>
                  <p className="text-sm text-muted-foreground mb-4">Análise dos últimos 3 meses</p>
                  <Button onClick={() => generateReport('pdf')} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-gray-50 transition-colors">
                <CardContent className="p-6 text-center">
                  <FileText className="h-10 w-10 mx-auto mb-2 text-purple-500" />
                  <h3 className="font-medium mb-1">Relatório Anual</h3>
                  <p className="text-sm text-muted-foreground mb-4">Resumo financeiro do ano atual</p>
                  <Button onClick={() => generateReport('pdf')} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Relatório</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar tipo de relatório" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="revenue">Receitas</SelectItem>
                    <SelectItem value="expenses">Despesas</SelectItem>
                    <SelectItem value="profit">Lucro</SelectItem>
                    <SelectItem value="clients">Por Cliente</SelectItem>
                    <SelectItem value="cases">Por Processo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Agrupar por</label>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar agrupamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Dia</SelectItem>
                    <SelectItem value="week">Semana</SelectItem>
                    <SelectItem value="month">Mês</SelectItem>
                    <SelectItem value="quarter">Trimestre</SelectItem>
                    <SelectItem value="year">Ano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Período</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                          </>
                        ) : (
                          formatDate(dateRange.from)
                        )
                      ) : (
                        <span>Selecionar período</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from ?? new Date()}
                      selected={dateRange}
                      onSelect={(range: { from: Date | undefined; to: Date | undefined } | undefined) => setDateRange({ from: range?.from, to: range?.to })}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>

                <Select defaultValue="custom">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Período predefinido" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="yesterday">Ontem</SelectItem>
                    <SelectItem value="thisWeek">Esta semana</SelectItem>
                    <SelectItem value="lastWeek">Semana passada</SelectItem>
                    <SelectItem value="thisMonth">Este mês</SelectItem>
                    <SelectItem value="lastMonth">Mês passado</SelectItem>
                    <SelectItem value="thisYear">Este ano</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-end">
              <Button variant="outline" className="sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Mais Filtros
              </Button>
              <Button onClick={() => generateReport('pdf')} className="sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button onClick={() => generateReport('excel')} variant="outline" className="sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Excel
              </Button>
              <Button onClick={() => generateReport('csv')} variant="outline" className="sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                CSV
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FinancialReports;