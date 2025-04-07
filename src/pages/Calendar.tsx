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
import CalendarSidebar from "@/components/calendar/CalendarSidebar";
import { useToast } from "@/hooks/use-toast";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<Array<any>>([]);
  const [view, setView] = useState(Views.MONTH);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
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

  const handleEventCreate = useCallback((eventData: any) => {
    const newEvent = {
      id: Date.now().toString(),
      title: eventData.title,
      start: eventData.dateRange.from,
      end: eventData.dateRange.to,
      description: eventData.description,
      category: eventData.category,
      isRecurring: eventData.isRecurring,
      recurrenceType: eventData.recurrenceType
    };

    setEvents(prev => [...prev, newEvent]);
    setIsEventFormOpen(false);
    toast({
      title: "Evento criado",
      description: "O evento foi adicionado com sucesso."
    });
  }, []);

  const handleEventSelect = useCallback((event: any) => {
    setSelectedEvent(event);
    setIsEventFormOpen(true);
  }, []);

  const handleEventUpdate = useCallback((eventData: any) => {
    setEvents(prev => prev.map(event => 
      event.id === selectedEvent.id 
        ? { ...event, ...eventData }
        : event
    ));
    setIsEventFormOpen(false);
    setSelectedEvent(null);
    toast({
      title: "Evento atualizado",
      description: "As alterações foram salvas com sucesso."
    });
  }, [selectedEvent]);

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
        <CalendarSidebar
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
