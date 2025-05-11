import { useState, useEffect, useCallback } from 'react';
import { CalendarEvent } from '@/components/calendar/EventForm';

const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    // Try to load events from localStorage
    const savedEvents = localStorage.getItem('calendarEvents');
    return savedEvents ? JSON.parse(savedEvents) : [
      {
        id: '1',
        title: 'Reunião com cliente',
        start: new Date(new Date().setHours(10, 0, 0, 0)),
        end: new Date(new Date().setHours(11, 0, 0, 0)),
        category: 'meeting',
        description: 'Discussão sobre o caso nº 2023-001',
        priority: 'high',
        client: 'João Silva',
        process: 'Processo nº 2023-001'
      },
      {
        id: '2',
        title: 'Prazo processual',
        start: new Date(new Date().setDate(new Date().getDate() + 2)),
        end: new Date(new Date().setDate(new Date().getDate() + 2)),
        category: 'deadline',
        description: 'Entrega de contestação',
        priority: 'high',
        client: 'Empresa ABC',
        process: 'Processo nº 2023-002'
      },
      {
        id: '3',
        title: 'Audiência preliminar',
        start: new Date(new Date().setDate(new Date().getDate() + 5)),
        end: new Date(new Date().setDate(new Date().getDate() + 5)),
        category: 'meeting',
        description: 'Tribunal da Comarca de Lisboa',
        priority: 'medium',
        client: 'Maria Oliveira',
        process: 'Processo nº 2023-003',
        location: 'Tribunal da Comarca de Lisboa'
      }
    ];
  });
  
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [clientFilter, setClientFilter] = useState<string[]>([]);
  const [processFilter, setProcessFilter] = useState<string[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string[]>([]);
  
  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);
  
  // Filter events based on selected filters
  const filteredEvents = events.filter(event => {
    const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(event.category);
    const matchesClient = clientFilter.length === 0 || 
      (event.client && clientFilter.includes(event.client));
    const matchesProcess = processFilter.length === 0 || 
      (event.process && processFilter.includes(event.process));
    const matchesPriority = priorityFilter.length === 0 || 
      (event.priority && priorityFilter.includes(event.priority));
    
    return matchesCategory && matchesClient && matchesProcess && matchesPriority;
  });
  
  // Add a new event
  const addEvent = useCallback((event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
  }, []);
  
  // Update an existing event
  const updateEvent = useCallback((id: string, newData: Partial<CalendarEvent>) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === id ? { ...event, ...newData } : event
      )
    );
  }, []);
  
  // Remove an event
  const removeEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  }, []);
  
  // Move an event to a different date
  const moveEvent = useCallback((id: string, newDate: Date) => {
    setEvents(prev => {
      return prev.map(event => {
        if (event.id === id) {
          // Calculate the difference between start and end times
          const duration = Number(event.end) - Number(event.start);
          
          // Create new start date based on the provided date
          const newStart = new Date(newDate);
          // Keep the original time
          newStart.setHours(
            event.start.getHours(),
            event.start.getMinutes(),
            event.start.getSeconds()
          );
          
          // Create new end date by adding the original duration
          const newEnd = new Date(Number(newStart) + duration);
          
          return {
            ...event,
            start: newStart,
            end: newEnd
          };
        }
        return event;
      });
    });
  }, []);
  
  // Get unique clients from events for filtering
  const getUniqueClients = useCallback(() => {
    const clients = events
      .filter(event => event.client)
      .map(event => event.client as string);
    
    return Array.from(new Set(clients));
  }, [events]);
  
  // Get unique processes from events for filtering
  const getUniqueProcesses = useCallback(() => {
    const processes = events
      .filter(event => event.process)
      .map(event => event.process as string);
    
    return Array.from(new Set(processes));
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
