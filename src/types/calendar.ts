
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: 'meeting' | 'deadline' | 'task' | 'other';
  description?: string;
  isRecurring?: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}
