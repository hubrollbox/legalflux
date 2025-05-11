
import { useState } from 'react';
import { CalendarEvent } from '@/types/calendar';

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const addEvent = (event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
    return event;
  };

  const updateEvent = (eventId: string, updatedData: Partial<CalendarEvent>) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId
          ? { ...event, ...updatedData }
          : event
      )
    );
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent
  };
};

export default useCalendarEvents;
