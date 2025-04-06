import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Calendar from "react-calendar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface CalendarSidebarProps {
  events: Array<{
    id: string;
    title: string;
    start: Date;
    end: Date;
    category: string;
  }>;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onCategoryFilter: (category: string) => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  events,
  selectedDate,
  onDateChange,
  onCategoryFilter,
}) => {
  const categories = [
    { id: 'meeting', label: 'Reunião', color: 'bg-blue-500' },
    { id: 'deadline', label: 'Prazo', color: 'bg-red-500' },
    { id: 'task', label: 'Tarefa', color: 'bg-green-500' },
    { id: 'other', label: 'Outro', color: 'bg-gray-500' },
  ];

  const upcomingEvents = events
    .filter(event => event.start >= new Date())
    .sort((a, b) => a.start.getTime() - b.start.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 w-64">
      <Card>
        <CardHeader>
          <CardTitle>Mini Calendário</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            onChange={onDateChange}
            value={selectedDate}
            className="w-full"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map(category => (
              <div
                key={category.id}
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => onCategoryFilter(category.id)}
              >
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
                <span>{category.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="space-y-1">
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-gray-500">
                    {format(event.start, "dd/MM/yyyy HH:mm")}
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${categories.find(c => c.id === event.category)?.color} text-white`}
                  >
                    {categories.find(c => c.id === event.category)?.label}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarSidebar;