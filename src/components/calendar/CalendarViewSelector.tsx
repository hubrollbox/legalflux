import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, LayoutGrid, List, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewType = 'month' | 'week' | 'day' | 'agenda';

interface CalendarViewSelectorProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  className?: string;
}

const CalendarViewSelector: React.FC<CalendarViewSelectorProps> = ({
  currentView,
  onViewChange,
  className,
}) => {
  const views = [
    { id: 'month', label: 'Mês', icon: <LayoutGrid className="h-4 w-4" /> },
    { id: 'week', label: 'Semana', icon: <CalendarIcon className="h-4 w-4" /> },
    { id: 'day', label: 'Dia', icon: <Clock className="h-4 w-4" /> },
    { id: 'agenda', label: 'Agenda', icon: <List className="h-4 w-4" /> },
  ];

  return (
    <div className={cn("flex space-x-1 rounded-md border bg-background p-1", className)}>
      {views.map((view) => (
        <Button
          key={view.id}
          variant={currentView === view.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onViewChange(view.id as ViewType)}
          className={cn(
            "flex items-center gap-1",
            currentView === view.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {view.icon}
          <span className="hidden sm:inline">{view.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default CalendarViewSelector;