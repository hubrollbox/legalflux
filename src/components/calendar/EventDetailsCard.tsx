import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarEvent } from './DraggableEvent';
import { Users, Clock, FileText, Calendar as CalendarIcon, Briefcase, Gavel, Scale, MapPin, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventDetailsCardProps {
  event: CalendarEvent;
  onEdit?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({
  event,
  onEdit,
  onDelete,
  onClose,
}) => {
  // Função para obter o ícone com base na categoria do evento
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meeting':
        return <Users className="h-5 w-5" />;
      case 'deadline':
        return <Clock className="h-5 w-5" />;
      case 'task':
        return <FileText className="h-5 w-5" />;
      case 'hearing':
        return <Gavel className="h-5 w-5" />;
      case 'trial':
        return <Scale className="h-5 w-5" />;
      case 'client':
        return <Briefcase className="h-5 w-5" />;
      default:
        return <CalendarIcon className="h-5 w-5" />;
    }
  };

  // Função para obter o nome da categoria
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'meeting':
        return 'Reunião';
      case 'deadline':
        return 'Prazo';
      case 'task':
        return 'Tarefa';
      case 'hearing':
        return 'Audiência';
      case 'trial':
        return 'Julgamento';
      case 'client':
        return 'Cliente';
      default:
        return 'Outro';
    }
  };

  // Função para obter a cor com base na categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meeting':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'deadline':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'task':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'hearing':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'trial':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'client':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Função para obter a cor e ícone com base na prioridade
  const getPriorityInfo = (priority?: string) => {
    switch (priority) {
      case 'high':
        return { color: 'bg-red-100 text-red-700 border-red-200', icon: <AlertTriangle className="h-4 w-4" />, label: 'Alta' };
      case 'medium':
        return { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: <AlertTriangle className="h-4 w-4" />, label: 'Média' };
      case 'low':
        return { color: 'bg-green-100 text-green-700 border-green-200', icon: <AlertTriangle className="h-4 w-4" />, label: 'Baixa' };
      default:
        return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: null, label: 'Normal' };
    }
  };

  const priorityInfo = getPriorityInfo(event.priority);

  return (
    <Card className="w-full shadow-md border-l-4" style={{ borderLeftColor: event.priority === 'high' ? '#ef4444' : event.priority === 'medium' ? '#eab308' : '#22c55e' }}>
      <CardHeader className={cn("pb-2", getCategoryColor(event.category))}>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-white/80">
              {getCategoryIcon(event.category)}
            </div>
            <CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
          </div>
          <Badge variant="outline" className={priorityInfo.color}>
            {priorityInfo.icon && <span className="mr-1">{priorityInfo.icon}</span>}
            {priorityInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            <span>
              {format(new Date(event.start), 'PPP', { locale: ptBR })} • 
              {format(new Date(event.start), 'HH:mm', { locale: ptBR })}
              {event.end && ` - ${format(new Date(event.end), 'HH:mm', { locale: ptBR })}`}
            </span>
          </div>

          {event.description && (
            <div className="mt-2 text-sm">
              <p className="text-muted-foreground mb-1 font-medium">Descrição:</p>
              <p>{event.description}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mt-3">
            {event.client && (
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{event.client}</span>
              </div>
            )}

            {event.process && (
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{event.process}</span>
              </div>
            )}

            {event.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{event.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline" className={getCategoryColor(event.category)}>
                {getCategoryName(event.category)}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex gap-2">
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              Editar
            </Button>
          )}
          {onDelete && (
            <Button variant="outline" size="sm" onClick={onDelete} className="text-red-500 hover:text-red-700">
              Excluir
            </Button>
          )}
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Fechar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventDetailsCard;