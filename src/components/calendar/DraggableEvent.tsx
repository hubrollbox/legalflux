import React from 'react';
import { useDrag } from 'react-dnd';
import { Users, Clock, FileText, Calendar as CalendarIcon, Briefcase, Gavel, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: 'meeting' | 'deadline' | 'task' | 'hearing' | 'trial' | 'client' | 'other';
  description?: string;
  client?: string;
  process?: string;
  location?: string;
  priority?: 'high' | 'medium' | 'low';
  isRecurring?: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';
}

interface DraggableEventProps {
  event: CalendarEvent;
  onClick?: (event: CalendarEvent) => void;
  className?: string;
  isDraggable?: boolean;
  showTime?: boolean;
  showDetails?: boolean;
}

const DraggableEvent: React.FC<DraggableEventProps> = ({
  event,
  onClick,
  className,
  isDraggable = true,
  showTime = true,
  showDetails = false
}) => {
  // Usando useRef para criar uma referência para o elemento div
  const elementRef = React.useRef<HTMLDivElement>(null);
  
  // Configurando o hook useDrag
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { id: event.id, event },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: isDraggable,
  }));
  
  // Aplicando a função drag à referência do elemento
  React.useEffect(() => {
    if (elementRef.current) {
      drag(elementRef.current);
    }
  }, [drag, elementRef]);

  // Função para obter o ícone com base na categoria do evento
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'deadline':
        return <Clock className="h-4 w-4" />;
      case 'task':
        return <FileText className="h-4 w-4" />;
      case 'hearing':
        return <Gavel className="h-4 w-4" />;
      case 'trial':
        return <Scale className="h-4 w-4" />;
      case 'client':
        return <Briefcase className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  // Função para obter a cor de fundo com base na categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meeting':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'deadline':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'task':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'hearing':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'trial':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300';
      case 'client':
        return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Função para obter a cor da borda com base na prioridade
  const getPriorityBorder = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500';
      case 'medium':
        return 'border-l-4 border-l-yellow-500';
      case 'low':
        return 'border-l-4 border-l-green-500';
      default:
        return '';
    }
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'p-2 rounded-md cursor-pointer transition-all',
        getCategoryColor(event.category),
        getPriorityBorder(event.priority),
        isDragging ? 'opacity-50' : 'opacity-100',
        className
      )}
      onClick={() => onClick && onClick(event)}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="text-muted-foreground">
          {getCategoryIcon(event.category)}
        </div>
        <h4 className="font-medium text-sm truncate">{event.title}</h4>
      </div>
      
      {showTime && (
        <p className="text-xs opacity-80">
          {format(new Date(event.start), 'HH:mm', { locale: ptBR })}
          {event.end && ` - ${format(new Date(event.end), 'HH:mm', { locale: ptBR })}`}
        </p>
      )}

      {showDetails && (
        <div className="mt-2 space-y-1 text-xs">
          {event.description && (
            <p className="line-clamp-2">{event.description}</p>
          )}
          {event.client && (
            <p className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              <span>{event.client}</span>
            </p>
          )}
          {event.process && (
            <p className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>Processo: {event.process}</span>
            </p>
          )}
          {event.location && (
            <p className="flex items-center gap-1">
              <span>Local: {event.location}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DraggableEvent;