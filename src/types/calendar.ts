
export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  category: CategoryKey;
  type?: 'deadline' | 'hearing' | 'meeting' | 'other';
  location?: string;
  client?: string;
  externalId?: string;
  externalCalendarId?: string;
  priority?: 'high' | 'medium' | 'low';
  process?: string;
  isRecurring?: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';
};

export type CategoryKey = 'case' | 'meeting' | 'deadline' | 'hearing' | 'other' | 'task' | 'trial' | 'client' | 'reminder' | 'document';

export interface CalendarProviderProps {
  children: React.ReactNode;
  initialView?: 'day' | 'week' | 'month';
}
