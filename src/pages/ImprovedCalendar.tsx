import { useState, useCallback, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Componentes personalizados
import ImprovedEventForm from "@/components/calendar/ImprovedEventForm";
import ImprovedCalendarSidebar from "@/components/calendar/ImprovedCalendarSidebar";
import CalendarViewSelector from "@/components/calendar/CalendarViewSelector";
import EventDetailsCard from "@/components/calendar/EventDetailsCard";
import AgendaView from "@/components/calendar/AgendaView";
import DroppableCalendarCell from "@/components/calendar/DroppableCalendarCell";
import type { CalendarEvent } from '@/types';

// Hook personalizado
import { useCalendarEvents } from "@/components/calendar/hooks/useCalendarEvents";

type ViewType = 'month' | 'week' | 'day' | 'agenda';

const ImprovedCalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  // Usar o hook personalizado para gerenciar eventos
  const {
    events,
    filteredEvents,
    categoryFilter,
    clientFilter,
    processFilter,
    priorityFilter,
    setCategoryFilter,
    setClientFilter,
    setProcessFilter,
    setPriorityFilter,
    addEvent,
    updateEvent,
    removeEvent,
    moveEvent,
    getUniqueClients,
    getUniqueProcesses
  } = useCalendarEvents();

  // Estilo personalizado para os eventos no calendário
  const eventStyleGetter = useCallback((event: CalendarEvent) => {
    const categoryColors: Record<string, string> = {
      meeting: "bg-blue-100 text-blue-700 border-blue-200",
      deadline: "bg-red-100 text-red-700 border-red-200",
      task: "bg-green-100 text-green-700 border-green-200",
      hearing: "bg-purple-100 text-purple-700 border-purple-200",
      trial: "bg-amber-100 text-amber-700 border-amber-200",
      client: "bg-indigo-100 text-indigo-700 border-indigo-200",
      other: "bg-gray-100 text-gray-700 border-gray-200"
    };

    const priorityBorder = {
      high: "border-l-4 border-l-red-500",
      medium: "border-l-4 border-l-yellow-500",
      low: "border-l-4 border-l-green-500"
    };

    const style = {
      className: cn(
        categoryColors[event.category] || "bg-gray-100 text-gray-700",
        event.priority ? priorityBorder[event.priority] : "",
        "rounded-md border transition-colors hover:border-gray-300"
      )
    };

    return { style };
  }, []);

  // Configuração do localizador para o calendário
  const locales = { 'pt-BR': ptBR };
  const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

  // Manipuladores de eventos
  const handleEventCreate = useCallback((eventData: Partial<CalendarEvent>) => {
    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: eventData.title || 'Novo Evento',
      start: eventData.start || new Date(),
      end: eventData.end || new Date(),
      category: eventData.category || 'other',
      description: eventData.description,
      client: eventData.client,
      process: eventData.process,
      location: eventData.location,
      priority: eventData.priority,
    };

    addEvent(newEvent);
    setIsEventFormOpen(false);
    toast({
      title: "Evento criado",
      description: "O evento foi adicionado com sucesso."
    });
  }, [addEvent, toast]);

  const handleEventSelect = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsDetailsOpen(true);
  }, []);

  const handleEventUpdate = useCallback((eventData: Partial<CalendarEvent>) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, eventData);
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

  const handleEventDrop = useCallback((eventId: string, newDate: Date) => {
    moveEvent(eventId, newDate);
    toast({
      title: "Evento movido",
      description: "O evento foi reagendado com sucesso."
    });
  }, [moveEvent, toast]);

  // Componentes personalizados para o BigCalendar
  const components = {
    month: {
      dateHeader: (props: any) => (
        <DroppableCalendarCell 
          date={props.date} 
          onEventDrop={handleEventDrop}
        >
          <div className="text-center py-1">
            <span className={cn(
              "text-sm font-medium",
              props.isCurrentMonth ? "" : "text-muted-foreground",
              props.isToday ? "bg-primary text-primary-foreground rounded-full px-2 py-1" : ""
            )}>
              {format(props.date, 'd')}
            </span>
          </div>
        </DroppableCalendarCell>
      )
    }
  };

  // Renderização condicional com base na visualização selecionada
  const renderCalendarView = () => {
    if (view === 'agenda') {
      return (
        <AgendaView 
          events={filteredEvents} 
          onEventClick={handleEventSelect} 
        />
      );
    }

    return (
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
            onView={(newView) => setView(newView as ViewType)}
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
            components={components}
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
    );
  };

  return (
    <DashboardLayout>
      <DndProvider backend={HTML5Backend}>
        <div className="dashboard-header">
          <SectionHeader
            title="Agenda"
            description="Gerencie os seus compromissos, audiências e prazos"
          />
          <div className="flex items-center gap-2">
            <CalendarViewSelector 
              currentView={view} 
              onViewChange={setView} 
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
        </div>

        <div className="flex gap-6 mt-6">
          <ImprovedCalendarSidebar
            events={events}
            selectedDate={date}
            onDateChange={setDate}
            onCategoryFilter={setCategoryFilter}
            onClientFilter={setClientFilter}
            onProcessFilter={setProcessFilter}
            onPriorityFilter={setPriorityFilter}
            categoryFilter={categoryFilter}
            clientFilter={clientFilter}
            processFilter={processFilter}
            priorityFilter={priorityFilter}
            onEventClick={handleEventSelect}
          />

          {renderCalendarView()}

          {/* Diálogo para criar/editar evento */}
          <Dialog open={isEventFormOpen} onOpenChange={setIsEventFormOpen}>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedEvent ? "Editar Evento" : "Novo Evento"}
                </DialogTitle>
              </DialogHeader>
              <ImprovedEventForm
                onSubmit={selectedEvent ? handleEventUpdate : handleEventCreate}
                initialData={selectedEvent || undefined}
                clients={getUniqueClients()}
                processes={getUniqueProcesses()}
              />
            </DialogContent>
          </Dialog>

          {/* Diálogo para detalhes do evento */}
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="sm:max-w-[500px]">
              {selectedEvent && (
                <EventDetailsCard
                  event={selectedEvent}
                  onEdit={() => {
                    setIsDetailsOpen(false);
                    setIsEventFormOpen(true);
                  }}
                  onDelete={handleEventDelete}
                  onClose={() => setIsDetailsOpen(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </DndProvider>
    </DashboardLayout>
  );
};

export default ImprovedCalendarPage;