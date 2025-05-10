
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, FileText, User } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';
import { useNavigate } from 'react-router-dom';

interface ProcessCardProps {
  process: {
    id: string;
    title: string;
    number?: string;
    client?: string;
    status?: string;
    priority?: string;
    deadline?: string | Date;
    documentCount?: number;
    responsible?: string;
    createdAt?: string | Date;
  };
  compact?: boolean;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ process, compact = false }) => {
  const navigate = useNavigate();

  const handleViewProcess = () => {
    navigate(`/processes/${process.id}`);
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status.toLowerCase()) {
      case 'active':
      case 'ativo':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'pending':
      case 'pendente':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'closed':
      case 'encerrado':
        return <Badge className="bg-gray-500">Encerrado</Badge>;
      case 'urgent':
      case 'urgente':
        return <Badge className="bg-red-500">Urgente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    
    switch (priority.toLowerCase()) {
      case 'high':
      case 'alta':
        return <Badge variant="outline" className="border-red-500 text-red-500">Alta</Badge>;
      case 'medium':
      case 'média':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Média</Badge>;
      case 'low':
      case 'baixa':
        return <Badge variant="outline" className="border-green-500 text-green-500">Baixa</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{process.title}</CardTitle>
          {getStatusBadge(process.status)}
        </div>
        {process.number && (
          <p className="text-sm text-muted-foreground mt-1">
            Processo n.º {process.number}
          </p>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          {process.client && (
            <div className="flex items-center gap-2 text-sm">
              <User size={16} className="text-muted-foreground" />
              <span>{process.client}</span>
            </div>
          )}
          {process.deadline && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-muted-foreground" />
              <span>Prazo: {formatDate(process.deadline)}</span>
            </div>
          )}
          {process.documentCount !== undefined && (
            <div className="flex items-center gap-2 text-sm">
              <FileText size={16} className="text-muted-foreground" />
              <span>{process.documentCount} documentos</span>
            </div>
          )}
          {process.createdAt && (
            <div className="flex items-center gap-2 text-sm">
              <Clock size={16} className="text-muted-foreground" />
              <span>Criado em: {formatDate(process.createdAt)}</span>
            </div>
          )}
          {process.priority && !compact && (
            <div className="flex items-center gap-2 text-sm mt-2">
              <span>Prioridade:</span>
              {getPriorityBadge(process.priority)}
            </div>
          )}
        </div>
      </CardContent>
      {!compact && (
        <CardFooter className="p-4 pt-0">
          <Button onClick={handleViewProcess} className="w-full" variant="outline">
            Ver Processo
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProcessCard;
