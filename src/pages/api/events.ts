import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .order('start', { ascending: true })

        if (error) throw error
        res.status(200).json(data)
      } catch (err) {
        res.status(500).json({ error: 'Falha ao carregar eventos' })
      }
      break

    case 'POST':
      try {
        const eventData = req.body
        const { data, error } = await supabase
          .from('events')
          .insert([eventData])
          .select()

        if (error) throw error
        res.status(201).json(data[0])
      } catch (err) {
        res.status(400).json({ error: 'Falha ao criar evento' })
      }
      break

    case 'PUT':
      try {
        const { id, ...updateData } = req.body
        const { data, error } = await supabase
          .from('events')
          .update(updateData)
          .eq('id', id)
          .select()

        if (error) throw error
        res.status(200).json(data[0])
      } catch (err) {
        res.status(400).json({ error: 'Falha ao atualizar evento' })
      }
      break

    case 'DELETE':
      try {
        const { id } = req.body
        const { error } = await supabase
          .from('events')
          .delete()
          .eq('id', id)

        if (error) throw error
        res.status(204).end()
      } catch (err) {
        res.status(500).json({ error: 'Falha ao excluir evento' })
      }
      break

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Método ${req.method} não permitido`)
  }
}