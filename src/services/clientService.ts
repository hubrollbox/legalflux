import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/client';

// Export the clientService with minimal changes to fix the type issues
export const clientService = {
  async createClient(clientData: Omit<Client, 'id' | 'criado_em'>, userId: string, advogadoId?: string) {
    const { data, error } = await supabase
      .from('clientes')
      .insert({
        ...clientData,
        user_id: userId,
        advogado_id: advogadoId
      })
      .select();

    if (error) throw error;
    return data[0];
  },

  async getClient(id: string) {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateClient(id: string, clientData: Partial<Client>) {
    const { data, error } = await supabase
      .from('clientes')
      .update(clientData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  async deleteClient(id: string) {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async listClients(userId?: string, userRole?: string, advogadoId?: string) {
    const query = supabase
      .from('clientes')
      .select('*')
      .order('criado_em', { ascending: false });

    if (userRole !== 'admin' && advogadoId) {
      query.eq('advogado_id', advogadoId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }
};