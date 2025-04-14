import { useState, useEffect, useCallback } from 'react';
import { addDays, isSameDay, startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { useNotificationStore } from '@/services/notificationService';
import type { CalendarEvent } from '@/types';

interface UseCalendarEventsProps {
  initialEvents?: CalendarEvent[];
}

export const useCalendarEvents = ({ initialEvents = [] }: UseCalendarEventsProps = {}) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>(events);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [clientFilter, setClientFilter] = useState<string | null>(null);
  const [processFilter, setProcessFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const { addNotification } = useNotificationStore();

  // Aplicar filtros aos eventos
  useEffect(() => {
    let result = [...events];
    
    if (categoryFilter) {
      result = result.filter(event => event.category === categoryFilter);
    }
    
    if (clientFilter) {
      result = result.filter(event => 
        event.client?.toLowerCase().includes(clientFilter.toLowerCase())
      );
    }
    
    if (processFilter) {
      result = result.filter(event => 
        event.process?.toLowerCase().includes(processFilter.toLowerCase())
      );
    }
    
    if (priorityFilter) {
      result = result.filter(event => event.priority === priorityFilter);
    }
    
    setFilteredEvents(result);
  }, [events, categoryFilter, clientFilter, processFilter, priorityFilter]);

  // Adicionar um novo evento
  const addEvent = useCallback((event: CalendarEvent) => {
    setEvents(prev => [...prev, event]);
    
    // Criar notificação para o novo evento
    addNotification({
      id: `event-notification-${event.id}`,
      type: 'deadline',
      title: `Novo evento: ${event.title}`,
      content: `Um novo evento foi agendado para ${event.start.toLocaleDateString()}.`,
      timestamp: new Date().toISOString(),
      read: false,
      priority: (event.priority || 'medium') as 'medium' | 'high' | 'low'
    });
    
    return event;
  }, [addNotification]);

  // Atualizar um evento existente
  const updateEvent = useCallback((eventId: string, updatedData: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, ...updatedData } : event
    ));
  }, []);

  // Remover um evento
  const removeEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  }, []);

  // Mover um evento para uma nova data
  const moveEvent = useCallback((eventId: string, newDate: Date) => {
    setEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        const duration = event.end.getTime() - event.start.getTime();
        const newStart = startOfDay(newDate);
        newStart.setHours(event.start.getHours());
        newStart.setMinutes(event.start.getMinutes());
        
        const newEnd = new Date(newStart.getTime() + duration);
        
        // Criar notificação para o evento reagendado
        addNotification({
          id: `event-moved-${event.id}-${Date.now()}`,
          type: 'deadline',
          title: `Evento reagendado: ${event.title}`,
          content: `O evento foi movido para ${newStart.toLocaleDateString()}.`,
          timestamp: new Date().toISOString(),
          read: false,
          priority: (event.priority || 'medium') as 'medium' | 'high' | 'low'
        });
        
        return { ...event, start: newStart, end: newEnd };
      }
      return event;
    }));
  }, [addNotification]);

  // Obter eventos para uma data específica
  const getEventsForDate = useCallback((date: Date) => {
    return filteredEvents.filter(event => 
      isSameDay(new Date(event.start), date)
    );
  }, [filteredEvents]);

  // Obter eventos para um intervalo de datas
  const getEventsForRange = useCallback((start: Date, end: Date) => {
    return filteredEvents.filter(event => {
      const eventStart = new Date(event.start);
      return isWithinInterval(eventStart, { start: startOfDay(start), end: endOfDay(end) });
    });
  }, [filteredEvents]);

  // Obter eventos próximos (hoje e próximos dias)
  const getUpcomingEvents = useCallback((days: number = 7) => {
    const today = new Date();
    const futureDate = addDays(today, days);
    
    return filteredEvents
      .filter(event => {
        const eventDate = new Date(event.start);
        return isWithinInterval(eventDate, { 
          start: startOfDay(today), 
          end: endOfDay(futureDate) 
        });
      })
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  }, [filteredEvents]);

  // Obter clientes únicos dos eventos
  const getUniqueClients = useCallback(() => {
    const clients = events
      .filter(event => event.client)
      .map(event => event.client as string);
    
    return [...new Set(clients)];
  }, [events]);

  // Obter processos únicos dos eventos
  const getUniqueProcesses = useCallback(() => {
    const processes = events
      .filter(event => event.process)
      .map(event => event.process as string);
    
    return [...new Set(processes)];
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
    getEventsForDate,
    getEventsForRange,
    getUpcomingEvents,
    getUniqueClients,
    getUniqueProcesses
  };
};