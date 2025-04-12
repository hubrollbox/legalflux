import React, { useMemo } from 'react';
import { format, isToday, isTomorrow, isThisWeek, isThisMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { CalendarEvent } from './DraggableEvent';
import DraggableEvent from './DraggableEvent';
import { cn } from '@/lib/utils';

interface AgendaViewProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  className?: string;
}

type GroupedEvents = {
  today: {
    title: string;
    events: CalendarEvent[];
  };
  tomorrow: {
    title: string;
    events: CalendarEvent[];
  };
  thisWeek: {
    title: string;
    events: CalendarEvent[];
  };
  thisMonth: {
    title: string;
    events: CalendarEvent[];
  };
  future: {
    title: string;
    events: CalendarEvent[];
  };
  [key: string]: {
    title: string;
    events: CalendarEvent[];
  };
};

const AgendaView: React.FC<AgendaViewProps> = ({
  events,
  onEventClick,
  className,
}) => {
  // Agrupar eventos por período (hoje, amanhã, esta semana, este mês, futuro)
  const groupedEvents = useMemo(() => {
    // Não precisamos da variável 'today' pois as funções isToday, isTomorrow, etc.
    // já fazem a comparação com a data atual internamente
    
    const groups: GroupedEvents = {
      today: { title: 'Hoje', events: [] },
      tomorrow: { title: 'Amanhã', events: [] },
      thisWeek: { title: 'Esta Semana', events: [] },
      thisMonth: { title: 'Este Mês', events: [] },
      future: { title: 'Futuro', events: [] },
    };
    
    // Ordenar eventos por data
    const sortedEvents = [...events].sort((a, b) => 
      new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    
    sortedEvents.forEach(event => {
      const eventDate = new Date(event.start);
      
      if (isToday(eventDate)) {
        groups.today.events.push(event);
      } else if (isTomorrow(eventDate)) {
        groups.tomorrow.events.push(event);
      } else if (isThisWeek(eventDate, { locale: ptBR })) {
        groups.thisWeek.events.push(event);
      } else if (isThisMonth(eventDate)) {
        groups.thisMonth.events.push(event);
      } else {
        groups.future.events.push(event);
      }
    });
    
    return groups;
  }, [events]);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Agenda</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          <div className="px-4 py-2 space-y-6">
            {Object.entries(groupedEvents).map(([key, group]) => {
              if (group.events.length === 0) return null;
              
              return (
                <div key={key} className="space-y-3">
                  <div className="sticky top-0 z-10 bg-background pt-2 pb-1">
                    <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                      <Badge variant="outline" className={cn(
                        "mr-2",
                        key === 'today' ? "bg-blue-100 text-blue-700 border-blue-200" :
                        key === 'tomorrow' ? "bg-amber-100 text-amber-700 border-amber-200" :
                        "bg-gray-100 text-gray-700"
                      )}>
                        {group.title}
                      </Badge>
                      <Separator className="flex-1" />
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {group.events.map(event => {
                      const eventDate = new Date(event.start);
                      
                      return (
                        <div key={event.id} className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="font-medium">
                              {format(eventDate, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                            </span>
                            <span>
                              {format(eventDate, "HH:mm")}
                              {event.end && ` - ${format(new Date(event.end), "HH:mm")}`}
                            </span>
                          </div>
                          <DraggableEvent 
                            event={event} 
                            onClick={() => onEventClick && onEventClick(event)}
                            isDraggable={false}
                            showDetails={true}
                            className="border shadow-sm"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {Object.values(groupedEvents).every(group => group.events.length === 0) && (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Nenhum evento agendado</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AgendaView;