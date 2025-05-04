
import { CategoryKey } from './category';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  allDay?: boolean;
  location?: string;
  categoryId?: string;
  category?: CategoryKey; // Added for backward compatibility
  priority?: 'high' | 'medium' | 'low';
  status?: 'pending' | 'completed' | 'cancelled';
  client?: string; // Added for backward compatibility
  clientId?: string;
  process?: string; // Added for backward compatibility
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
