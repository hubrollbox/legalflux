import React from "react";

import Calendar from "react-calendar";

// Definindo o tipo Value localmente baseado na definição do react-calendar
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, FileText, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryKey } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';





interface CategoryConfig {
  label: string;
  color: string;
  icon: React.ReactNode;
  hoverColor: string;
}

const categoryConfig: Record<CategoryKey, CategoryConfig> = {
  meeting: {
    label: "Reuniões",
    color: "bg-blue-100 text-blue-700",
    hoverColor: "hover:bg-blue-50",
    icon: <Users className="h-4 w-4" />
  },
  deadline: {
    label: "Prazos",
    color: "bg-red-100 text-red-700",
    hoverColor: "hover:bg-red-50",
    icon: <Clock className="h-4 w-4" />
  },
  task: {
    label: "Tarefas",
    color: "bg-green-100 text-green-700",
    hoverColor: "hover:bg-green-50",
    icon: <FileText className="h-4 w-4" />
  },
  other: {
    label: "Outros",
    color: "bg-gray-100 text-gray-700",
    hoverColor: "hover:bg-gray-50",
    icon: <CalendarIcon className="h-4 w-4" />
  },
  reminder: {
    label: "Lembretes",
    color: "bg-yellow-100 text-yellow-700",
    hoverColor: "hover:bg-yellow-50",
    icon: <Clock className="h-4 w-4" />
  },
  document: {
    label: "Documentos",
    color: "bg-purple-100 text-purple-700",
    hoverColor: "hover:bg-purple-50",
    icon: <FileText className="h-4 w-4" />
  }
};

import { useCalendar } from './CalendarContext';

// Replace:
// Remove the type declaration and keep only the interface
interface EnhancedCalendarSidebarProps {
  // Add actual props here if needed
  // Currently empty since component doesn't accept props
}

export const EnhancedCalendarSidebar: React.FC<EnhancedCalendarSidebarProps> = () => {
  const {
    events,
    selectedDate = new Date(),
    handleDateChange: onDateChange,
    handleCategoryChange: onCategoryFilter,
    selectedCategory
  } = useCalendar();
  const handleDateChange = React.useCallback((value: Value) => {
    if (!value) return;
    
    if (value instanceof Date) {
      onDateChange(value);
    } else if (Array.isArray(value) && value.length > 0 && value[0] instanceof Date) {
      onDateChange(value[0]);
    }
  }, [onDateChange]);

  const eventsByCategory = React.useMemo(() => {
    return events.reduce<Record<CategoryKey, number>>((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {} as Record<CategoryKey, number>);
  }, [events]);

  const upcomingEvents = React.useMemo(() => {
    const now = new Date();
    return events
      .filter(event => event.start >= now)
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .slice(0, 5);
  }, [events]);

  const renderCategoryFilter = (category: CategoryKey | null) => {
    const config = category ? categoryConfig[category] : {
      label: "Todos",
      color: "bg-gray-100 text-gray-700",
      hoverColor: "hover:bg-gray-50",
      icon: <CalendarIcon className="h-4 w-4" />
    };

    const isSelected = selectedCategory === category;
    const count = category ? eventsByCategory[category] || 0 : events.length;

    return (
      <div
        key={category || 'all'}
        onClick={() => onCategoryFilter(category)}
        className={cn(
          "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
          isSelected ? config.color : config.hoverColor
        )}
      >
        <div className="flex items-center gap-2">
          {config.icon}
          <span>{config.label}</span>
        </div>
        <Badge variant="secondary">{count}</Badge>
      </div>
    );
  };

  return (
    <div className="w-80 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Calendário</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate ?? new Date()}
            className={cn(
              "w-full",
              "rounded-lg",
              "border-none",
              "shadow-none"
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {renderCategoryFilter(null)}
            {(Object.keys(categoryConfig) as CategoryKey[]).map(category => 
              renderCategoryFilter(category)
            )}
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
              {upcomingEvents.map(event => {
                const config = categoryConfig[event.category];
                return (
                  <div
                    key={event.id}
                    className={cn(
                      'p-3 rounded-lg',
                      config.color
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {config.icon}
                      <div className="flex items-center gap-2">
  <h4 className="font-medium">{event.title}</h4>
  {event.priority && (
    <Badge 
      variant="outline"
      className={cn(
        'text-xs capitalize',
        event.priority === 'high' && 'bg-red-100 text-red-700',
        event.priority === 'medium' && 'bg-orange-100 text-orange-700',
        event.priority === 'low' && 'bg-green-100 text-green-700'
      )}
    >
      {event.priority}
    </Badge>
  )}
</div>
                    </div>
                    <p className="text-sm opacity-80">
                      {format(event.start, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                    </p>
                    {event.description && (
                      <p className="text-sm mt-1 opacity-70 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedCalendarSidebar;
// Replace empty interfaces with:
interface MyInterface {
  // Add actual properties or use:
  [key: string]: unknown;
}
// Or:
type MyInterface = unknown; // For any value type