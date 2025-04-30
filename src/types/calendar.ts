export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  category?: string;
  type?: 'deadline' | 'hearing' | 'meeting' | 'other';
  location?: string;
  client?: string;
  externalId?: string;
  externalCalendarId?: string;
};

export type CategoryKey = 'case' | 'meeting' | 'deadline' | 'hearing' | 'other';

export interface CalendarProviderProps {
  children: React.ReactNode;
  initialView?: 'day' | 'week' | 'month';
}
