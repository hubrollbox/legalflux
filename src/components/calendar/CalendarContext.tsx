
import React, { createContext, useContext, useState } from 'react';
import type { CalendarEvent, CategoryKey } from '@/types';

interface CalendarContextType {
  events: CalendarEvent[];
  selectedDate: Date;
  selectedEvent: CalendarEvent | null;
  selectedCategory: CategoryKey | null;
  handleDateChange: (date: Date) => void;
  handleEventSelect: (event: CalendarEvent | null) => void;
  handleCategoryChange: (category: CategoryKey | null) => void;
  handleAddEvent: (event: CalendarEvent) => void;
  handleUpdateEvent: (event: CalendarEvent) => void;
  handleDeleteEvent: (eventId: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventSelect = (event: CalendarEvent | null) => {
    setSelectedEvent(event);
  };

  const handleCategoryChange = (category: CategoryKey | null) => {
    setSelectedCategory(category);
  };

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <CalendarContext.Provider
      value={{
        events,
        selectedDate,
        selectedEvent,
        selectedCategory,
        handleDateChange,
        handleEventSelect,
        handleCategoryChange,
        handleAddEvent,
        handleUpdateEvent,
        handleDeleteEvent
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
