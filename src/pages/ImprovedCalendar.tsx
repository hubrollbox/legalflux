
import { useState, useCallback } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar as BigCalendar, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import dateFnsLocalizer from "react-big-calendar/lib/localizers/date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Componentes personalizados
import EventForm, { CalendarEvent } from "@/components/calendar/EventForm";
import useCalendarEvents from "@/components/calendar/hooks/useCalendarEvents";

// Simplified version of the page for brevity
const ImprovedCalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  // Use the calendar events hook
  const {
    events,
    filteredEvents,
    addEvent,
    updateEvent,
    removeEvent,
    moveEvent,
  } = useCalendarEvents();

  // Configure the localizer for the calendar
  const locales = { 'pt-BR': ptBR };
  const localizer = dateFnsLocalizer({ 
    format, 
    parse, 
    startOfWeek, 
    getDay, 
    locales 
  });

  // Event styling
  const eventStyleGetter = useCallback((event: any) => {
    const categoryColors: Record<string, string> = {
      meeting: "bg-blue-100 text-blue-700 border-blue-200",
      deadline: "bg-red-100 text-red-700 border-red-200",
      task: "bg-green-100 text-green-700 border-green-200",
      other: "bg-gray-100 text-gray-700 border-gray-200"
    };

    const priorityBorder = {
      high: "border-l-4 border-l-red-500",
      medium: "border-l-4 border-l-yellow-500",
      low: "border-l-4 border-l-green-500"
    };

    const category = event.category || 'other';
    const priority = event.priority;

    return {
      className: cn(
        categoryColors[category] || "bg-gray-100 text-gray-700",
        priority ? (priorityBorder[priority] || "") : "",
        "rounded-md border transition-colors hover:border-gray-300"
      )
    };
  }, []);

  // Event handlers
  const handleEventCreate = useCallback((data: CalendarEvent) => {
    addEvent(data);
    setIsEventFormOpen(false);
    toast({
      title: "Evento criado",
      description: "O evento foi adicionado com sucesso."
    });
  }, [addEvent, toast]);

  const handleEventSelect = useCallback((event: any) => {
    setSelectedEvent(event as CalendarEvent);
    setIsDetailsOpen(true);
  }, []);

  const handleEventUpdate = useCallback((data: CalendarEvent) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, data);
      setIsEventFormOpen(false);
      setIsDetailsOpen(false);
      setSelectedEvent(null);
      toast({
        title: "Evento atualizado",
        description: "As alterações foram salvas com sucesso."
      });
    }
  }, [selectedEvent, updateEvent, toast]);

  const handleEventDelete = useCallback(() => {
    if (selectedEvent) {
      removeEvent(selectedEvent.id);
      setIsDetailsOpen(false);
      setSelectedEvent(null);
      toast({
        title: "Evento excluído",
        description: "O evento foi removido com sucesso."
      });
    }
  }, [selectedEvent, removeEvent, toast]);

  return (
    <DashboardLayout>
      <DndProvider backend={HTML5Backend}>
        <div className="dashboard-header">
          <SectionHeader
            title="Agenda"
            description="Gerencie os seus compromissos, audiências e prazos"
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
                  showMore: (total) => `+${total} mais`
                }}
              />
            </CardContent>
          </Card>

          {/* Event Form Dialog */}
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

          {/* Event Details Dialog - Simplified for this fix */}
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="sm:max-w-[500px]">
              {selectedEvent && (
                <div>
                  <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                      Fechar
                    </Button>
                    <Button onClick={() => {
                      setIsDetailsOpen(false);
                      setIsEventFormOpen(true);
                    }}>
                      Editar
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleEventDelete}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </DndProvider>
    </DashboardLayout>
  );
};

export default ImprovedCalendarPage;
