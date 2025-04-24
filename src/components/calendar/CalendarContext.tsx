import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CalendarEvent, CategoryKey } from '@/types';

type CalendarContextType = {
  events: CalendarEvent[];
  selectedDate: Date;
  selectedCategory: CategoryKey | null;
  loading: boolean;
  error: string | null;
  handleDateChange: (date: Date) => void;
  handleCategoryChange: (category: CategoryKey | null) => void;
  refreshEvents: () => Promise<void>;
  createEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<void>;
  updateEvent: (eventId: string, updates: Partial<CalendarEvent>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
};

const CalendarContext = createContext<CalendarContextType | null>(null);

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<CalendarContextType['selectedCategory']>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Erro ao buscar eventos');
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCategoryChange = (category: CalendarContextType['selectedCategory']) => {
    setSelectedCategory(category);
  };

  const createEvent = async (event: Omit<CalendarEvent, 'id'>) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      if (!response.ok) throw new Error('Erro ao criar evento');
      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar evento');
    }
  };

  const updateEvent = async (eventId: string, updates: Partial<CalendarEvent>) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Erro ao atualizar evento');
      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar evento');
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },

      });
      if (!response.ok) throw new Error('Erro ao excluir evento');
      await fetchEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir evento');
    }
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        selectedDate,
        selectedCategory,
        loading,
        error,
        handleDateChange,
        handleCategoryChange,
        refreshEvents: fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
// Move non-component exports to a separate file like calendar-utils.ts
// Keep only component exports in this file