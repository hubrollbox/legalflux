
export type CategoryKey = 'case' | 'meeting' | 'deadline' | 'hearing' | 'other' | 'task' | 'trial' | 'client' | 'reminder' | 'document';

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

export interface CalendarProviderProps {
  children: React.ReactNode;
  initialView?: 'day' | 'week' | 'month';
}

export interface CategoryConfig {
  label: string;
  color: string;
  hoverColor: string;
  icon: React.ReactNode;
}
