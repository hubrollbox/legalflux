
import React, { useState, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus, Users, Clock, FileText, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import EventForm from "@/components/calendar/EventForm";
import EnhancedCalendarSidebar from "@/components/calendar/EnhancedCalendarSidebar";
import { useToast } from "@/hooks/use-toast";

interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  category: 'meeting' | 'deadline' | 'task' | 'other'
  description?: string
  isRecurring?: boolean
  recurrenceType?: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

// Hook para simular o uso do calendário (poderia ser movido para um arquivo separado)
const useCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const createEvent = async (eventData: Partial<CalendarEvent>) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventData.title || 'Untitled',
      start: eventData.start || new Date(),
      end: eventData.end || new Date(),
      category: eventData.category || 'other',
      description: eventData.description,
      isRecurring: eventData.isRecurring,
      recurrenceType: eventData.recurrenceType,
    };
    
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = async (eventId: string, eventData: Partial<CalendarEvent>) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId
          ? { ...event, ...eventData }
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
  initialEvents: CalendarEvent[]
}

const CalendarPage = ({ initialEvents }: CalendarPageProps) => {
  const [date, setDate] = useState(new Date());
  const { events, createEvent, updateEvent, deleteEvent } = useCalendar();
  const [view, setView] = useState(Views.MONTH);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { toast } = useToast();

  const eventStyleGetter = (event: any) => {
    const categoryColors = {
      meeting: { bg: "bg-blue-100", text: "text-blue-700", icon: <Users className="h-4 w-4" /> },
      deadline: { bg: "bg-red-100", text: "text-red-700", icon: <Clock className="h-4 w-4" /> },
      task: { bg: "bg-green-100", text: "text-green-700", icon: <FileText className="h-4 w-4" /> },
      other: { bg: "bg-gray-100", text: "text-gray-700", icon: <CalendarIcon className="h-4 w-4" /> }
    };

    const style = {
      className: cn(
        categoryColors[event.category]?.bg || "bg-gray-100",
        categoryColors[event.category]?.text || "text-gray-700",
        "rounded-md border border-transparent transition-colors hover:border-gray-300"
      )
    };

    return { style };
  };

  const locales = { 'pt-BR': ptBR };
  const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

  const handleEventCreate = useCallback(async (eventData: CalendarEvent) => {
    try {
      await createEvent({
        title: eventData.title,
        start: eventData.start,
        end: eventData.end,
        category: eventData.category,
        description: eventData.description,
        isRecurring: eventData.isRecurring,
        recurrenceType: eventData.recurrenceType
      });
      setIsEventFormOpen(false);
      toast({
        title: "Evento criado",
        description: "O evento foi adicionado com sucesso.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erro ao criar evento",
        description: "Não foi possível criar o evento. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  }, [createEvent, toast]);

  const handleEventSelect = useCallback((event: any) => {
    setSelectedEvent(event);
    setIsEventFormOpen(true);
  }, []);

  const handleEventUpdate = useCallback(async (eventData: CalendarEvent) => {
    try {
      if (!selectedEvent) return;
      await updateEvent(selectedEvent.id, eventData);
      setIsEventFormOpen(false);
      setSelectedEvent(null);
      toast({
        title: "Evento atualizado",
        description: "As alterações foram salvas com sucesso.",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar evento",
        description: "Não foi possível atualizar o evento. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  }, [selectedEvent, updateEvent, toast]);

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
          events={events}
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
              onView={setView}
              onSelectEvent={handleEventSelect}
              onNavigate={setDate}
              date={date}
              views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
              eventPropGetter={eventStyleGetter}
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
                showMore: total => `+${total} mais`
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
