import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import type { CalendarEvent } from '@/types';

let events: CalendarEvent[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  
  if (!session) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    switch (req.method) {
      case 'GET': {
        return res.status(200).json(events);
      }

      case 'POST': {
        const newEvent: Omit<CalendarEvent, 'id'> = {
          ...req.body,
          start: new Date(req.body.start),
          end: new Date(req.body.end)
        };
        
        if (!newEvent.title || !newEvent.start || !newEvent.end) {
          return res.status(400).json({ error: 'Dados inválidos' });
        }

        const createdEvent: CalendarEvent = {
          ...newEvent,
          id: Date.now().toString()
        };
        events.push(createdEvent);
        return res.status(201).json(createdEvent);
      }

      case 'PUT': {
        const eventId = req.query.id as string;
        const updates = req.body;
        
        if (!updates.start || !updates.end) {
          return res.status(400).json({ error: 'Datas inválidas' });
        }
        
        const index = events.findIndex(e => e.id === eventId);
        if (index === -1) return res.status(404).json({ error: 'Evento não encontrado' });
        
        const updatedEvent = {
          ...events[index],
          ...updates,
          start: new Date(updates.start),
          end: new Date(updates.end)
        };
        
        events[index] = updatedEvent;
        return res.status(200).json(updatedEvent);
      }

      case 'DELETE': {
        const eventId = req.query.id as string;
        events = events.filter(e => e.id !== eventId);
        return res.status(204).end();
      }

      default:
        return res.status(405).json({ error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}