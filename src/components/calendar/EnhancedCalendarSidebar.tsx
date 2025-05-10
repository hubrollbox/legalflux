
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: 'meeting' | 'deadline' | 'task' | 'other';
  description?: string;
  isRecurring?: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

interface EnhancedCalendarSidebarProps {
  events: Event[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onCategoryFilter: (category: string | null) => void;
}

const EnhancedCalendarSidebar: React.FC<EnhancedCalendarSidebarProps> = ({
  events,
  selectedDate,
  onDateChange,
  onCategoryFilter
}) => {
  const eventsForDate = events.filter(event => 
    event.start.getDate() === selectedDate.getDate() &&
    event.start.getMonth() === selectedDate.getMonth() &&
    event.start.getFullYear() === selectedDate.getFullYear()
  );

  return (
    <aside className="w-64 space-y-4">
      <Card>
        <CardHeader className="p-4">
          <h3 className="text-lg font-medium">Calendário</h3>
        </CardHeader>
        <CardContent className="p-3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && onDateChange(date)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4">
          <h3 className="text-lg font-medium">Filtros</h3>
        </CardHeader>
        <CardContent className="p-3 space-y-2">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={() => onCategoryFilter(null)}
          >
            Todos
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-blue-700" 
            onClick={() => onCategoryFilter('meeting')}
          >
            <Badge className="bg-blue-100 text-blue-700 mr-2">
              {events.filter(e => e.category === 'meeting').length}
            </Badge>
            Reuniões
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-700" 
            onClick={() => onCategoryFilter('deadline')}
          >
            <Badge className="bg-red-100 text-red-700 mr-2">
              {events.filter(e => e.category === 'deadline').length}
            </Badge>
            Prazos
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-green-700" 
            onClick={() => onCategoryFilter('task')}
          >
            <Badge className="bg-green-100 text-green-700 mr-2">
              {events.filter(e => e.category === 'task').length}
            </Badge>
            Tarefas
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4">
          <h3 className="text-lg font-medium">Eventos para {selectedDate.toLocaleDateString()}</h3>
        </CardHeader>
        <CardContent className="p-3">
          {eventsForDate.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nenhum evento para esta data.
            </p>
          ) : (
            <ul className="space-y-2">
              {eventsForDate.map((event) => (
                <li key={event.id} className="p-2 text-sm border rounded">
                  <p className="font-medium">{event.title}</p>
                  <p className="text-xs text-gray-500">
                    {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </aside>
  );
};

export default EnhancedCalendarSidebar;
