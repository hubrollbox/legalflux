
export type CategoryKey = 'meeting' | 'deadline' | 'task' | 'hearing' | 'trial' | 'client' | 'other' | 'document';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: 'meeting' | 'deadline' | 'task' | 'other' | 'hearing' | 'trial' | 'client' | 'document';
  description?: string;
  isRecurring?: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: 'high' | 'medium' | 'low';
  client?: string;
  process?: string;
  location?: string;
}

export interface DraggableEventProps {
  event: CalendarEvent;
  onEventDrop?: (eventId: string, newDate: Date) => void;
}

export interface AgendaItem {
  id: string;
  title: string;
  time: string;
  category: CategoryKey;
  priority?: 'high' | 'medium' | 'low';
  isToday?: boolean;
  client?: string;
  process?: string;
  location?: string;
}

export interface CalendarFilterProps {
  categoryFilter: string | null;
  clientFilter: string | null;
  processFilter: string | null;
  priorityFilter: string | null;
  onCategoryFilter: (category: string | null) => void;
  onClientFilter: (client: string | null) => void;
  onProcessFilter: (process: string | null) => void;
  onPriorityFilter: (priority: string | null) => void;
}
