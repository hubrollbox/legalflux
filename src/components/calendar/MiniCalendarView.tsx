
import React, { useState, useMemo } from "react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import type { CalendarEvent } from "@/types/calendar";

interface MiniCalendarViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  className?: string;
}

const MiniCalendarView: React.FC<MiniCalendarViewProps> = ({
  events,
  selectedDate,
  onDateChange,
  className,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Group events by date
  const eventsByDay = useMemo(() => {
    return events.reduce((acc: Record<string, CalendarEvent[]>, event) => {
      const dateKey = format(new Date(event.start), "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [events]);

  // Custom modifiers for days with events
  const modifiers = useMemo(() => {
    return {
      hasEvents: Object.keys(eventsByDay).map((dateStr) => new Date(dateStr)),
      isSelected: selectedDate,
    };
  }, [eventsByDay, selectedDate]);

  // Custom modifier styles
  const modifiersStyles = {
    hasEvents: { border: "2px solid #9b87f5" },
    isSelected: { backgroundColor: "#9b87f5", color: "white" },
  };

  // Function to render the day cell with event indicators
  const renderDayContents = (day: Date) => {
    const dateKey = format(day, "yyyy-MM-dd");
    const dayEvents = eventsByDay[dateKey] || [];
    const hasEvents = dayEvents.length > 0;

    return (
      <div className="relative flex flex-col items-center justify-center">
        <span>{format(day, "d")}</span>
        {hasEvents && (
          <div className="flex space-x-0.5 mt-1 absolute -bottom-1">
            {dayEvents.slice(0, 3).map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-primary"
              />
            ))}
            {dayEvents.length > 3 && (
              <div className="w-1 h-1 rounded-full bg-gray-300" />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "border rounded-lg shadow-sm bg-white p-3",
        className
      )}
    >
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date: Date | undefined) => date && onDateChange(date)}
        onMonthChange={setCurrentMonth}
        locale={pt}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        showOutsideDays
        className="w-full"
      />

      <div className="mt-4 text-sm">
        <h4 className="font-medium mb-2">
          Eventos em {format(selectedDate, "d 'de' MMMM", { locale: pt })}
        </h4>
        {eventsByDay[format(selectedDate, "yyyy-MM-dd")]?.length ? (
          <div className="space-y-1">
            {eventsByDay[format(selectedDate, "yyyy-MM-dd")].map((event) => (
              <div
                key={event.id}
                className="px-2 py-1 text-xs rounded bg-gray-50 hover:bg-gray-100 cursor-pointer"
              >
                <span className="font-medium">{format(new Date(event.start), "HH:mm")}</span>
                {" - "}
                {event.title}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-xs">
            Sem eventos agendados para este dia.
          </p>
        )}
      </div>
    </div>
  );
};

export default MiniCalendarView;
