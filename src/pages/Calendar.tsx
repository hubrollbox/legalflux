
import React, { useState, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus, Users, Clock, FileText, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import moment from "moment";
import "moment/locale/pt-br";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EventForm, { CalendarEvent } from "@/components/calendar/EventForm";
import { useToast } from "@/hooks/use-toast";
import { CategoryKey } from '@/types/calendar';

// Import the EnhancedCalendarSidebar component
import EnhancedCalendarSidebar from "@/components/calendar/EnhancedCalendarSidebar";

// Configure moment to use pt-BR locale
moment.locale("pt-br");

// Use momentLocalizer instead of dateFnsLocalizer
const localizer = momentLocalizer(moment);

// Extended Event type to support all possible categories for our calendar
type ExtendedEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: CategoryKey;
  description?: string;
  priority?: "high" | "medium" | "low";
  location?: string;
  client?: string;
  process?: string;
};

// Hook para simular o uso do calendário (poderia ser movido para um arquivo separado)
const useCalendar = () => {
  const [events, setEvents] = useState<ExtendedEvent[]>([]);

  const createEvent = async (eventData: CalendarEvent) => {
    setEvents(prev => [...prev, eventData as ExtendedEvent]);
    return eventData;
  };

  const updateEvent = async (eventId: string, eventData: Partial<CalendarEvent>) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId
          ? { ...event, ...eventData } as ExtendedEvent
          : event
      )
    );
  };

  const deleteEvent = async (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  return { events, createEvent, updateEvent, deleteEvent };
};

interface CalendarPageProps {
  initialEvents?: CalendarEvent[]
}

const CalendarPage = ({ initialEvents = [] }: CalendarPageProps) => {
  const [date, setDate] = useState(new Date());
  const { events, createEvent, updateEvent, deleteEvent } = useCalendar();
  const [view, setView] = useState(Views.MONTH);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  useToast();

  // Define handler for event selection
  const handleEventSelect = (event: any) => {
    // Cast the event to CalendarEvent type
    const calEvent = event as unknown as CalendarEvent;
    setSelectedEvent(calEvent);
    setIsEventFormOpen(true);
  };

  // Define handlers for event create/update
  const handleEventCreate = (data: CalendarEvent) => {
    createEvent(data).then(() => {
      // toast removido, pois não está disponível
      setIsEventFormOpen(false);
    });
  };

  const handleEventUpdate = (data: CalendarEvent) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, data).then(() => {
        // toast removido, pois não está disponível
        setIsEventFormOpen(false);
      });
    }
  };

  // Define a custom event style getter
  const eventStyleGetter = (event: any) => {
    const categoryColors: {[key: string]: { bg: string; text: string; icon: React.ReactNode }} = {
      meeting: { bg: "bg-blue-100", text: "text-blue-700", icon: <Users className="h-4 w-4" /> },
      deadline: { bg: "bg-red-100", text: "text-red-700", icon: <Clock className="h-4 w-4" /> },
      task: { bg: "bg-green-100", text: "text-green-700", icon: <FileText className="h-4 w-4" /> },
      other: { bg: "bg-gray-100", text: "text-gray-700", icon: <CalendarIcon className="h-4 w-4" /> },
      document: { bg: "bg-purple-100", text: "text-purple-700", icon: <FileText className="h-4 w-4" /> },
      hearing: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <Users className="h-4 w-4" /> },
      trial: { bg: "bg-orange-100", text: "text-orange-700", icon: <Users className="h-4 w-4" /> },
      client: { bg: "bg-indigo-100", text: "text-indigo-700", icon: <Users className="h-4 w-4" /> }
    };

    // Use explicit category check with safe access
    const eventCategory = event.category || 'other';
    const colorInfo = categoryColors[eventCategory] || categoryColors.other;
    
    return {
      style: {
        className: cn(
          colorInfo.bg,
          colorInfo.text,
          "rounded-md border border-transparent transition-colors hover:border-gray-300"
        )
      }
    };
  };

  const filteredEvents = categoryFilter
    ? events.filter(event => event.category === categoryFilter)
    : events;

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Agenda"
          description="Gerencie os seus compromissos e prazos"
        />
        <Button 
          className="bg-highlight hover:bg-highlight/90"
          onClick={() => {
            setSelectedEvent(null);
            setIsEventFormOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Evento
        </Button>
      </div>

      <div className="flex gap-6 mt-6">
        <EnhancedCalendarSidebar
          events={events as any[]}
          selectedDate={date}
          onDateChange={setDate}
          onCategoryFilter={setCategoryFilter}
        />

        <Card className="flex-1">
          <CardContent className="p-6">
            <BigCalendar
              localizer={localizer}
              events={filteredEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 700 }}
              culture="pt-BR"
              view={view}
              onView={(newView) => setView(newView)}
              onSelectEvent={handleEventSelect}
              onNavigate={setDate}
              date={date}
              views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
              eventPropGetter={(event) => ({
                className: cn(
                  event.category === 'meeting' ? "bg-blue-100 text-blue-700" :
                  event.category === 'deadline' ? "bg-red-100 text-red-700" :
                  event.category === 'task' ? "bg-green-100 text-green-700" :
                  event.category === 'document' ? "bg-purple-100 text-purple-700" :
                  event.category === 'hearing' ? "bg-yellow-100 text-yellow-700" :
                  event.category === 'trial' ? "bg-orange-100 text-orange-700" :
                  event.category === 'client' ? "bg-indigo-100 text-indigo-700" :
                  "bg-gray-100 text-gray-700",
                  "rounded-md border border-transparent transition-colors hover:border-gray-300"
                )
              })}
              dayPropGetter={(date) => ({
                style: {
                  backgroundColor: date.getDay() === 0 || date.getDay() === 6 ? "#f9fafb" : "transparent"
                }
              })}
              messages={{
                month: "Mês",
                week: "Semana",
                day: "Dia",
                agenda: "Agenda",
                today: "Hoje",
                next: "Próximo",
                previous: "Anterior",
                showMore: (total: number) => `+${total} mais`
              }}
            />
          </CardContent>
        </Card>

        <Dialog open={isEventFormOpen} onOpenChange={setIsEventFormOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {selectedEvent ? "Editar Evento" : "Novo Evento"}
              </DialogTitle>
            </DialogHeader>
            <EventForm
              onSubmit={selectedEvent ? handleEventUpdate : handleEventCreate}
              initialData={selectedEvent}
            />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
