import type { CalendarEvent, CategoryKey } from '@/types';

export const fetchEvents = async () => {
  try {
    const response = await fetch('/api/events');
    if (!response.ok) throw new Error('Erro ao buscar eventos');
    return await response.json();
  } catch (err) {
    throw err;
  }
};

export type CalendarContextType = {
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
function someFunction() {
  return result;
}
return result;