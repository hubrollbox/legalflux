import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

type Invoice = {
  id: string;
  number: string;
  description: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  processNumber?: string;
};

const BillingPage = () => {
  const [invoices] = useState<Invoice[]>([
    {
      id: '1',
      number: 'INV-2023-001',
      description: 'Honorários Iniciais - Processo de Recuperação de Crédito',
      amount: 1500.00,
      issueDate: '2023-10-15',
      dueDate: '2023-11-15',
      status: 'paid',
      processNumber: '2023/12345'
    },
    {
      id: '2',
      number: 'INV-2023-002',
      description: 'Honorários Mensais - Novembro/2023',
      amount: 500.00,
      issueDate: '2023-11-01',
      dueDate: '2023-11-30',
      status: 'pending',
      processNumber: '2023/12345'
    },
    {
      id: '3',
      number: 'INV-2023-003',
      description: 'Custas Processuais - Ação de Despejo',
      amount: 350.00,
      issueDate: '2023-10-20',
      dueDate: '2023-10-30',
      status: 'overdue',
      processNumber: '2023/67890'
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Pago</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500">Vencido</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  // Calcular totais
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices
    .filter(invoice => invoice.status === 'pending' || invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  const paidPercentage = Math.round((paidAmount / totalAmount) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestão Financeira</h1>
        <p className="text-muted-foreground">
          Acompanhe e gerencie suas faturas e pagamentos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Faturado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pago</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{paidAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendente de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">€{pendingAmount.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progresso de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Pago: {paidPercentage}%</span>
              <span className="text-sm font-medium">€{paidAmount.toFixed(2)} de €{totalAmount.toFixed(2)}</span>
            </div>
            <Progress value={paidPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="paid">Pagas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Todas as Faturas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Processo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data de Emissão</TableHead>
                    <TableHead>Data de Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.number}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>{invoice.processNumber}</TableCell>
                      <TableCell>€{invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{new Date(invoice.issueDate).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell>{new Date(invoice.dueDate).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          {invoice.status !== 'paid' && (
                            <Button size="sm" variant="default">
                              Pagar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Faturas Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Processo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data de Emissão</TableHead>
                    <TableHead>Data de Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.filter(invoice => invoice.status === 'pending' || invoice.status === 'overdue').map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.number}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>{invoice.processNumber}</TableCell>
                      <TableCell>€{invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{new Date(invoice.issueDate).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell>{new Date(invoice.dueDate).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="default">
                            Pagar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="paid">
          <Card>
            <CardHeader>
              <CardTitle>Faturas Pagas</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Processo</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data de Emissão</TableHead>
                    <TableHead>Data de Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.filter(invoice => invoice.status === 'paid').map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.number}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>{invoice.processNumber}</TableCell>
                      <TableCell>€{invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{new Date(invoice.issueDate).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell>{new Date(invoice.dueDate).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingPage;