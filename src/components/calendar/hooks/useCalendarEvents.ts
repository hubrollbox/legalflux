
import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from '@/types/calendar';

const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [clientFilter, setClientFilter] = useState<string | null>(null);
  const [processFilter, setProcessFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // Load events from localStorage on mount
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem('calendar-events');
      if (savedEvents) {
        const parsedEvents = JSON.parse(savedEvents);
        // Convert string dates back to Date objects
        const eventsWithDates = parsedEvents.map((event: any) => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }));
        setEvents(eventsWithDates);
      }
    } catch (error) {
      console.error('Error loading events from localStorage:', error);
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('calendar-events', JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  }, [events]);

  // Filter events based on filters
  const filteredEvents = events.filter(event => {
    const matchesCategory = !categoryFilter || event.category === categoryFilter;
    const matchesClient = !clientFilter || event.client === clientFilter;
    const matchesProcess = !processFilter || event.process === processFilter;
    const matchesPriority = !priorityFilter || event.priority === priorityFilter;

    return matchesCategory && matchesClient && matchesProcess && matchesPriority;
  });

  // CRUD operations
  const addEvent = useCallback((event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
  }, []);

  const updateEvent = useCallback((eventId: string, updatedData: Partial<CalendarEvent>) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId
          ? { ...event, ...updatedData }
          : event
      )
    );
  }, []);

  const removeEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  }, []);

  const moveEvent = useCallback((eventId: string, newDate: Date) => {
    setEvents(prev => 
      prev.map(event => {
        if (event.id === eventId) {
          // Calculate time difference between start and end
          const duration = event.end.getTime() - event.start.getTime();
          
          // Create new start date preserving the time component
          const newStart = new Date(newDate.setHours(
            event.start.getHours(),
            event.start.getMinutes()
          ));
          
          // Create new end date based on duration
          const newEnd = new Date(newStart.getTime() + duration);
          
          return {
            ...event,
            start: newStart,
            end: newEnd
          };
        }
        return event;
      })
    );
  }, []);

  // Utility functions for getting unique values
  const getUniqueClients = useCallback(() => {
    const clients = new Set<string>();
    events.forEach(event => {
      if (event.client) clients.add(event.client);
    });
    return Array.from(clients);
  }, [events]);

  const getUniqueProcesses = useCallback(() => {
    const processes = new Set<string>();
    events.forEach(event => {
      if (event.process) processes.add(event.process);
    });
    return Array.from(processes);
  }, [events]);

  return {
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
  };
};

export default useCalendarEvents;
