import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FinancialTransaction, TransactionStatus, TransactionType } from '@/types';
import { Download, Filter, Search, ArrowUpDown } from 'lucide-react';

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
    // Implementação real dependeria de bibliotecas como jspdf, xlsx, etc.
    alert(`Exportando dados em formato ${format}...`);
    
    if (format === 'csv') {
      // Exemplo simples de exportação CSV
      const headers = ['ID', 'Cliente', 'Caso', 'Valor', 'Tipo', 'Status', 'Data', 'Descrição'];
      
      const csvData = filteredTransactions.map(t => [
        t.id,
        t.clientName || '',
        t.caseName || '',
        `${t.amount} ${t.currency}`,
        translateTransactionType(t.type),
        translateTransactionStatus(t.status),
        new Date(t.date).toLocaleDateString('pt-PT'),
        t.description || ''
      ]);
      
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => row.join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `transacoes_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Tradução de tipos e status para português
  const translateTransactionType = (type: TransactionType): string => {
    const translations: Record<TransactionType, string> = {
      'invoice': 'Fatura',
      'payment': 'Pagamento',
      'refund': 'Reembolso',
      'subscription': 'Assinatura'
    };
    return translations[type] || type;
  };

  const translateTransactionStatus = (status: TransactionStatus): string => {
    const translations: Record<TransactionStatus, string> = {
      'pending': 'Pendente',
      'completed': 'Concluído',
      'failed': 'Falhou',
      'canceled': 'Cancelado'
    };
    return translations[status] || status;
  };

  // Status badge color
  const getStatusColor = (status: TransactionStatus): string => {
    const colors: Record<TransactionStatus, string> = {
      'pending': 'bg-yellow-500',
      'completed': 'bg-green-500',
      'failed': 'bg-red-500',
      'canceled': 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  // Ordenação e filtragem
  const toggleSort = (field: keyof FinancialTransaction) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(transaction => {
        // Filtro de pesquisa
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          (transaction.clientName?.toLowerCase().includes(searchLower) || false) ||
          (transaction.caseName?.toLowerCase().includes(searchLower) || false) ||
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
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar transações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="failed">Falhou</SelectItem>
                <SelectItem value="canceled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="invoice">Fatura</SelectItem>
                <SelectItem value="payment">Pagamento</SelectItem>
                <SelectItem value="refund">Reembolso</SelectItem>
                <SelectItem value="subscription">Assinatura</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end mb-4 gap-2">
          <Button variant="outline" onClick={() => exportData('csv')}>
            <Download className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button variant="outline" onClick={() => exportData('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => exportData('excel')}>
            <Download className="mr-2 h-4 w-4" />
            Excel
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] cursor-pointer" onClick={() => toggleSort('id')}>
                  <div className="flex items-center">
                    ID
                    {sortField === 'id' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('clientName')}>
                  <div className="flex items-center">
                    Cliente
                    {sortField === 'clientName' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('amount')}>
                  <div className="flex items-center">
                    Valor
                    {sortField === 'amount' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('type')}>
                  <div className="flex items-center">
                    Tipo
                    {sortField === 'type' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('status')}>
                  <div className="flex items-center">
                    Status
                    {sortField === 'status' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => toggleSort('date')}>
                  <div className="flex items-center">
                    Data
                    {sortField === 'date' && (
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Nenhuma transação encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="financial-table">
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.clientName || 'N/A'}</TableCell>
                    <TableCell className="font-medium">
                      {transaction.amount.toLocaleString('pt-PT')} {transaction.currency}
                    </TableCell>
                    <TableCell>{translateTransactionType(transaction.type)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {translateTransactionStatus(transaction.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleDateString('pt-PT')}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{transaction.description || 'N/A'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsTable;