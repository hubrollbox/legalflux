
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  description?: string;
  location?: string;
  categoryId?: string;
  userId?: string;
  processId?: string;
  reminderTime?: number; // minutes before event
  status?: 'scheduled' | 'cancelled' | 'completed';
  priority?: 'high' | 'medium' | 'low';
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number; // e.g. every 2 weeks
    endDate?: Date; // when the recurrence ends
    exceptions?: Date[]; // dates to exclude
  };
  attendees?: string[]; // user IDs or external emails
}

export interface EventCategory {
  id: string;
  name: string;
  color: string;
  userId?: string;
  isDefault?: boolean;
}
