
import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { isWithinInterval } from '@/utils/dateUtils';

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

const useCalendarEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        // Simulação de busca de eventos (substitua pela sua lógica real)
        const mockEvents: Event[] = [
          {
            id: '1',
            title: 'Reunião com o cliente A',
            start: new Date(2024, 6, 10, 10, 0, 0),
            end: new Date(2024, 6, 10, 11, 0, 0),
            color: '#FF5733',
          },
          {
            id: '2',
            title: 'Audiência do caso B',
            start: new Date(2024, 6, 15, 14, 0, 0),
            end: new Date(2024, 6, 15, 16, 0, 0),
            color: '#337AFF',
          },
          {
            id: '3',
            title: 'Prazo para entrega de documentos',
            start: new Date(2024, 6, 20, 0, 0, 0),
            end: new Date(2024, 6, 20, 23, 59, 59),
            color: '#33FF57',
          },
        ];

        setEvents(mockEvents);
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar eventos.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      return isWithinInterval(date, { start: event.start, end: event.end });
    });
  };

  return { events, loading, error, getEventsForDate };
};

export default useCalendarEvents;
