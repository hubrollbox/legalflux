
import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from '@/types/calendar';

// Utility function to get demo events
const getDemoEvents = (): CalendarEvent[] => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  return [
    {
      id: '1',
      title: 'Reunião com Cliente',
      start: new Date(now.setHours(10, 0, 0, 0)),
      end: new Date(now.setHours(11, 0, 0, 0)),
      category: 'meeting',
      client: 'Empresa ABC',
      process: 'Consultoria Jurídica',
      priority: 'high',
      location: 'Escritório Principal'
    },
    {
      id: '2',
      title: 'Prazo Judicial',
      start: new Date(tomorrow.setHours(14, 0, 0, 0)),
      end: new Date(tomorrow.setHours(15, 0, 0, 0)),
      category: 'deadline',
      process: 'Processo nº 12345',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Preparar Documentação',
      start: new Date(nextWeek.setHours(9, 0, 0, 0)),
      end: new Date(nextWeek.setHours(12, 0, 0, 0)),
      category: 'task',
      process: 'Aquisição Imobiliária',
      priority: 'medium'
    }
  ];
};

const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(getDemoEvents());
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [clientFilter, setClientFilter] = useState<string | null>(null);
  const [processFilter, setProcessFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);

  // Filtered events based on selected filters
  const filteredEvents = events.filter(event => {
    if (categoryFilter && event.category !== categoryFilter) return false;
    if (clientFilter && event.client !== clientFilter) return false;
    if (processFilter && event.process !== processFilter) return false;
    if (priorityFilter && event.priority !== priorityFilter) return false;
    return true;
  });

  // Add a new event
  const addEvent = useCallback((event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
  }, []);

  // Update an existing event
  const updateEvent = useCallback((eventId: string, eventData: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, ...eventData } : event
    ));
  }, []);

  // Remove an event
  const removeEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  }, []);

  // Move an event to a new date (for drag & drop)
  const moveEvent = useCallback((eventId: string, newDate: Date) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        // Calculate the time difference to preserve duration
        const duration = event.end.getTime() - event.start.getTime();
        
        // Create new start date based on the dropped date
        const newStart = new Date(newDate);
        
        // Create new end date preserving duration
        const newEnd = new Date(newStart.getTime() + duration);
        
        return { ...event, start: newStart, end: newEnd };
      }
      return event;
    }));
  }, []);

  // Get unique clients from events
  const getUniqueClients = useCallback(() => {
    return Array.from(new Set(
      events.filter(e => e.client).map(e => e.client)
    )).filter(Boolean) as string[];
  }, [events]);

  // Get unique processes from events
  const getUniqueProcesses = useCallback(() => {
    return Array.from(new Set(
      events.filter(e => e.process).map(e => e.process)
    )).filter(Boolean) as string[];
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
