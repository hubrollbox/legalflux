import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type Process = {
  id: string;
  number: string;
  title: string;
  court: string;
  status: 'active' | 'pending' | 'closed';
  lastUpdate: string;
};

const ProcessesPage = () => {
  const [processes] = useState<Process[]>([
    {
      id: '1',
      number: '2023/12345',
      title: 'Processo de Recuperação de Crédito',
      court: 'Tribunal Judicial de Lisboa',
      status: 'active',
      lastUpdate: '2023-11-15',
    },
    {
      id: '2',
      number: '2023/67890',
      title: 'Ação de Despejo',
      court: 'Tribunal Judicial do Porto',
      status: 'pending',
      lastUpdate: '2023-10-28',
    },
    {
      id: '3',
      number: '2022/54321',
      title: 'Processo de Insolvência',
      court: 'Tribunal Judicial de Coimbra',
      status: 'closed',
      lastUpdate: '2023-09-05',
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Encerrado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Meus Processos</h1>
        <p className="text-muted-foreground">
          Acompanhe todos os seus processos jurídicos em um só lugar.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Processos Ativos e Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Tribunal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Atualização</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.map((process) => (
                <TableRow key={process.id}>
                  <TableCell className="font-medium">{process.number}</TableCell>
                  <TableCell>{process.title}</TableCell>
                  <TableCell>{process.court}</TableCell>
                  <TableCell>{getStatusBadge(process.status)}</TableCell>
                  <TableCell>{new Date(process.lastUpdate).toLocaleDateString('pt-PT')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessesPage;