
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, Clock, AlertTriangle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format, isToday, isTomorrow, addDays } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { isWithinInterval } from "@/utils/dateUtils";

interface EventReminderProps {
  events: Array<{
    id: string;
    title: string;
    start: Date;
    end: Date;
    category: string;
    description?: string;
  }>;
  onEventClick: (eventId: string) => void;
}

const EventReminder: React.FC<EventReminderProps> = ({ events, onEventClick }) => {
  // Filtrar eventos próximos (hoje, amanhã e nos próximos 7 dias)
  const today = new Date();
  const nextWeek = addDays(today, 7);
  
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.start);
      return isWithinInterval(eventDate, { start: today, end: nextWeek });
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  const todayEvents = upcomingEvents.filter(event => isToday(new Date(event.start)));
  const tomorrowEvents = upcomingEvents.filter(event => isTomorrow(new Date(event.start)));
  const weekEvents = upcomingEvents.filter(event => {
    const eventDate = new Date(event.start);
    return !isToday(eventDate) && !isTomorrow(eventDate);
  });

  // Função para obter o ícone com base na categoria do evento
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'meeting':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'deadline':
        return <Clock className="h-4 w-4 text-red-500" />;
      case 'task':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  // Função para formatar a data do evento
  const formatEventDate = (date: Date) => {
    if (isToday(date)) {
      return `Hoje às ${format(date, 'HH:mm')}`;
    } else if (isTomorrow(date)) {
      return `Amanhã às ${format(date, 'HH:mm')}`;
    } else {
      return format(date, "EEEE, dd 'de' MMMM 'às' HH:mm");
    }
  };

  // Função para obter a cor de fundo com base na categoria
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meeting':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800';
      case 'deadline':
        return 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800';
      case 'task':
        return 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800';
      default:
        return 'bg-gray-50 border-gray-300 dark:bg-gray-800 dark:border-gray-700';
    }
  };

  // Função para obter a prioridade visual com base na proximidade da data
  const getEventPriority = (date: Date) => {
    if (isToday(date)) {
      return <Badge variant="destructive">Hoje</Badge>;
    } else if (isTomorrow(date)) {
      return <Badge variant="outline" className="border-amber-500 text-amber-800 dark:border-amber-300 dark:text-amber-300">Amanhã</Badge>;
    } else {
      return <Badge variant="outline">Em breve</Badge>;
    }
  };

  // Renderizar mensagem quando não há eventos
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
      <Bell className="h-12 w-12 mb-2 opacity-20" />
      <p>Não há eventos próximos</p>
      <p className="text-sm">Os lembretes aparecerão aqui quando houver eventos agendados</p>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Lembretes
          </CardTitle>
          <Badge className="bg-primary hover:bg-primary/90">{upcomingEvents.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          {upcomingEvents.length === 0 ? (
            renderEmptyState()
          ) : (
            <div className="p-4 space-y-4">
              {todayEvents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Hoje</h4>
                  {todayEvents.map(event => (
                    <div 
                      key={event.id}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent",
                        getCategoryColor(event.category)
                      )}
                      onClick={() => onEventClick(event.id)}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(event.category)}
                          <span className="font-medium">{event.title}</span>
                        </div>
                        {getEventPriority(new Date(event.start))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatEventDate(new Date(event.start))}
                      </p>
                      {event.description && (
                        <p className="text-sm mt-1 line-clamp-1">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {tomorrowEvents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Amanhã</h4>
                  {tomorrowEvents.map(event => (
                    <div 
                      key={event.id}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent",
                        getCategoryColor(event.category)
                      )}
                      onClick={() => onEventClick(event.id)}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(event.category)}
                          <span className="font-medium">{event.title}</span>
                        </div>
                        {getEventPriority(new Date(event.start))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatEventDate(new Date(event.start))}
                      </p>
                      {event.description && (
                        <p className="text-sm mt-1 line-clamp-1">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {weekEvents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">Próximos Dias</h4>
                  {weekEvents.map(event => (
                    <div 
                      key={event.id}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent",
                        getCategoryColor(event.category)
                      )}
                      onClick={() => onEventClick(event.id)}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(event.category)}
                          <span className="font-medium">{event.title}</span>
                        </div>
                        {getEventPriority(new Date(event.start))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatEventDate(new Date(event.start))}
                      </p>
                      {event.description && (
                        <p className="text-sm mt-1 line-clamp-1">{event.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EventReminder;
