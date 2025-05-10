
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: 'meeting' | 'deadline' | 'task' | 'hearing' | 'trial' | 'client' | 'other';
  description?: string;
  isRecurring?: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: 'high' | 'medium' | 'low';
  client?: string;
  process?: string;
  location?: string;
}
