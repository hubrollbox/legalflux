import React, { useState } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// Import directly from the path
import dateFnsLocalizer from 'react-big-calendar/lib/localizers/date-fns';
import { Button } from '@/components/ui/button';
import { CalendarEvent, CategoryKey } from '@/types/calendar';
import ImprovedEventForm from '@/components/calendar/ImprovedEventForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Create a simple placeholder for useCalendarEvents
const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const addEvent = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return { events, addEvent, updateEvent, deleteEvent };
};

// Create a simplified version to fix types
const ImprovedCalendar: React.FC = () => {
  // Sample events
  const { events, addEvent, updateEvent } = useCalendarEvents();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEventFormOpen, setEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Configure the localizer
  const locales = { 'pt-BR': ptBR };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  // Event handlers
  const handleSelectSlot = ({ start, end }: { start: Date, end: Date }) => {
    setSelectedEvent({
      id: String(Date.now()),
      title: '',
      start,
      end,
      category: 'meeting',
    });
    setEventFormOpen(true);
  };

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event as CalendarEvent);
    setEventFormOpen(true);
  };

  const handleEventSubmit = (event: Partial<CalendarEvent>) => {
    if (selectedEvent && event.id) {
      // Update existing event
      updateEvent({ ...selectedEvent, ...event } as CalendarEvent);
    } else {
      // Add new event
      addEvent({ 
        id: String(Date.now()),
        title: event.title || 'Sem título',
        start: event.start || new Date(),
        end: event.end || new Date(),
        category: (event.category as CategoryKey) || 'meeting',
        description: event.description,
        priority: event.priority,
        client: event.client,
        process: event.process,
        location: event.location
      });
    }
    setEventFormOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Calendário</h1>
          <p className="text-muted-foreground">
            Gerencie seus eventos e compromissos jurídicos
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              setSelectedEvent(null);
              setEventFormOpen(true);
            }}
          >
            Novo Evento
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 h-[80vh]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          defaultView={Views.MONTH}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          popup
          messages={{
            today: 'Hoje',
            previous: 'Anterior',
            next: 'Próximo',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            agenda: 'Agenda',
            date: 'Data',
            time: 'Hora',
            event: 'Evento',
            noEventsInRange: 'Não há eventos neste período.'
          }}
          views={['month', 'week', 'day', 'agenda']}
          date={selectedDate}
          onNavigate={date => setSelectedDate(date)}
        />
      </div>

      <Dialog open={isEventFormOpen} onOpenChange={setEventFormOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.id ? 'Editar Evento' : 'Novo Evento'}</DialogTitle>
          </DialogHeader>
          <ImprovedEventForm
            onSubmit={handleEventSubmit}
            initialData={selectedEvent || undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImprovedCalendar;
