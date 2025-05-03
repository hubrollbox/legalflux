
import React, { createContext, useState, useContext, useMemo } from 'react';
import type { CalendarEvent, CategoryKey } from '@/types';

interface CalendarContextProps {
  events: CalendarEvent[];
  filteredEvents: CalendarEvent[];
  selectedDate: Date;
  selectedCategory: CategoryKey | null;
  selectedEvent: CalendarEvent | null;
  handleDateChange: (date: Date) => void;
  handleCategoryChange: (category: CategoryKey | null) => void;
  handleEventSelect: (event: CalendarEvent) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, eventData: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const filteredEvents = useMemo(() => {
    if (!selectedCategory) return events;
    return events.filter(event => event.category === selectedCategory);
  }, [events, selectedCategory]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCategoryChange = (category: CategoryKey | null) => {
    setSelectedCategory(category);
  };

  const handleEventSelect = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const addEvent = (event: CalendarEvent) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };

  const updateEvent = (id: string, eventData: Partial<CalendarEvent>) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === id ? { ...event, ...eventData } : event
      )
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  const value = {
    events,
    filteredEvents,
    selectedDate,
    selectedCategory,
    selectedEvent,
    handleDateChange,
    handleCategoryChange,
    handleEventSelect,
    addEvent,
    updateEvent,
    deleteEvent
  };

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
