
export type CategoryKey = 'meeting' | 'deadline' | 'task' | 'other' | 'reminder' | 'document';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  category: CategoryKey;
  description?: string;
  externalId?: string;
  type?: string;
  client?: string;
  externalCalendarId?: string;
  priority?: string;
}

export interface CategoryConfig {
  label: string;
  color: string;
  icon: React.ComponentType;
}
