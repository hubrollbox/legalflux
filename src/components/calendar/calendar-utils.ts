import type { CalendarEvent, CategoryKey } from '@/types';

export const fetchEvents = async (): Promise<CalendarEvent[]> => {
  try {
    const response = await fetch('/api/events');
    if (!response.ok) throw new Error('Erro ao buscar eventos');
    return await response.json();
  } catch (err) {
    console.error('Event fetch error:', err);
    throw err;
  }
}

// Define proper types for the request body
export interface RequestBody {
  prompt: string;
  context?: string;
  role?: 'lawyer' | 'client';
  model?: 'basic' | 'standard' | 'premium';
  requestType?: 'chat' | 'document_analysis' | 'information_extraction' | 'legal_suggestions';
}  // Removed extra closing brace

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
export type CalendarView = {
  key: string;
  label: string;
};

export const calendarViews: CalendarView[] = [
  { key: 'day', label: 'Dia' },
  { key: 'week', label: 'Semana' }
];
// Removed stray 'return result' statement