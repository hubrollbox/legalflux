
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  description?: string;
  location?: string;
  categoryId?: string;
  category?: string; // Added this property
  userId?: string;
  processId?: string;
  process?: string; // Added this property 
  client?: string; // Added this property
  reminderTime?: number; // minutes before event
  status?: 'scheduled' | 'cancelled' | 'completed';
  priority?: 'high' | 'medium' | 'low';
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number; // e.g. every 2 weeks
    endDate?: Date; // when the recurrence ends
    exceptions?: Date[]; // dates to exclude
  };
  isRecurring?: boolean;
  recurrenceType?: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';
  attendees?: string[]; // user IDs or external emails
}

export interface EventCategory {
  id: string;
  name: string;
  color: string;
  userId?: string;
  isDefault?: boolean;
}
