import React, { useMemo } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import type { CalendarEvent } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { cn } from '@/lib/utils';
import type { CalendarDay, Modifiers } from 'react-day-picker';

interface MiniCalendarViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const MiniCalendarView: React.FC<MiniCalendarViewProps> = ({
  events,
  selectedDate,
  onDateChange,
}) => {
  // Agrupar eventos por data
  const eventsByDate = useMemo(() => {
    const grouped = new Map<string, CalendarEvent[]>();
    
    events.forEach(event => {
      const dateKey = format(new Date(event.start), 'yyyy-MM-dd');
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)?.push(event);
    });
    
    return grouped;
  }, [events]);

  // Função para renderizar o conteúdo do dia no calendário
  const renderDay = (day: CalendarDay) => {
    const dateKey = format(day.date, 'yyyy-MM-dd');
    const dayEvents = eventsByDate.get(dateKey) || [];
    
    if (dayEvents.length === 0) return null;
    
    // Agrupar eventos por categoria
    const categoryCounts: Record<string, number> = {};
    dayEvents.forEach(event => {
      categoryCounts[event.category] = (categoryCounts[event.category] || 0) + 1;
    });
    
    // Determinar se há eventos de alta prioridade
    const hasHighPriority = dayEvents.some(event => event.priority === 'high');
    
    return (
      <div className="flex justify-center">
        <Badge 
          variant="outline" 
          className={cn(
            "w-6 h-6 p-0 flex items-center justify-center text-[10px] font-semibold",
            hasHighPriority ? "border-red-500 text-red-500" : "border-primary text-primary"
          )}
        >
          {dayEvents.length}
        </Badge>
      </div>
    );
  };

  return (
    <div className="rounded-md border bg-card text-card-foreground shadow-sm">
      <div className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onDateChange(date)}
          locale={ptBR}
          className="w-full"
          components={{
            Day: ({ day, modifiers, ...props }: { day: CalendarDay; modifiers: Modifiers; [key: string]: any }) => (
              <div {...props}>
                <div>{format(day.date, 'd')}</div>
                {renderDay(day)}
              </div>
            )
          }}
          classNames={{
            day_today: "bg-muted font-bold text-primary",
            day_selected: "bg-primary text-primary-foreground font-bold",
          }}
        />
      </div>
      <div className="border-t px-4 py-3">
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="w-3 h-3 p-0 border-primary" />
            <span>Eventos</span>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="w-3 h-3 p-0 border-red-500" />
            <span>Prioridade Alta</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCalendarView;