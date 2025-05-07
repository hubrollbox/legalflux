
import { CategoryKey } from './category';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  location?: string;
  categoryId?: string;
  category?: CategoryKey;
  priority?: 'high' | 'medium' | 'low';
  status?: 'pending' | 'completed' | 'cancelled';
  client?: string;
  clientId?: string;
  process?: string;
  processId?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  isRecurring?: boolean;
  recurrenceRule?: string;
  recurrenceType?: string;
}

export interface CalendarFilter {
  categories?: string[];
  startDate?: Date;
  endDate?: Date;
  priority?: string[];
  status?: string[];
  search?: string;
}
