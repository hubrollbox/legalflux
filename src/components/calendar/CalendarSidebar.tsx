import React from "react";
import Calendar from "react-calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, FileText, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface CalendarSidebarProps {
  events: Array<{
    id: string;
    title: string;
    start: Date;
    end: Date;
    category: string;
    description?: string;
  }>;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onCategoryFilter: (category: string | null) => void;
}

const categoryConfig = {
  meeting: { label: "Reuniões", color: "bg-blue-100 text-blue-700", icon: <Users className="h-4 w-4" /> },
  deadline: { label: "Prazos", color: "bg-red-100 text-red-700", icon: <Clock className="h-4 w-4" /> },
  task: { label: "Tarefas", color: "bg-green-100 text-green-700", icon: <FileText className="h-4 w-4" /> },
  other: { label: "Outros", color: "bg-gray-100 text-gray-700", icon: <CalendarIcon className="h-4 w-4" /> }
};

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  events,
  selectedDate,
  onDateChange,
  onCategoryFilter,
}) => {
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(null);

  const handleCategoryFilter = (category: string | null) => {
    setCategoryFilter(category);
    onCategoryFilter(category);
  };
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

  const eventsByCategory = events.reduce((acc, event) => {
    const category = event.category || 'other';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="w-80 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Calendário</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Calendar
            onChange={(value) => {
              if (value instanceof Date) {
                onDateChange(value);
              }
            }}
            value={selectedDate}
            locale="pt-BR"
            className="w-full"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div
              onClick={() => handleCategoryFilter(null)}
              className={cn(
                "flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-100",
                !categoryFilter && "bg-gray-100"
              )}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Todos</span>
              </div>
              <Badge variant="secondary">{events.length}</Badge>
            </div>
            {Object.entries(categoryConfig).map(([category, config]) => (
              <div
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={cn(
                  "flex items-center justify-between p-2 rounded-lg cursor-pointer",
                  categoryFilter === category ? config.color : "hover:bg-gray-100"
                )}
              >
                <div className="flex items-center gap-2">
                  {config.icon}
                  <span>{config.label}</span>
                </div>
                <Badge variant="secondary">{eventsByCategory[category] || 0}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <div
                  key={event.id}
                  className={cn(
                    'p-3 rounded-lg',
                    categoryConfig[event.category]?.color || categoryConfig.other.color
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {categoryConfig[event.category]?.icon || categoryConfig.other.icon}
                    <h4 className="font-medium">{event.title}</h4>
                  </div>
                  <p className="text-sm opacity-80">
                    {format(new Date(event.start), 'dd/MM/yyyy HH:mm')}
                  </p>
                  {event.description && (
                    <p className="text-sm mt-1 opacity-70 line-clamp-2">
                      {event.description}
                    </p>
                  )}
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