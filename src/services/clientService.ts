import { createClient } from '@/integrations/supabase/client';
import { Client } from '@/types/client';
import { supabase } from '@/integrations/supabase/client';

// Export a single clientService object with properly typed methods
export const clientService = {
  async createClient(clientData: Omit<Client, 'id' | 'criado_em'>, userId: string, advogadoId?: string) {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .insert({
          ...clientData,
          user_id: userId,
          advogado_id: advogadoId
        })
        .select();

      if (error) throw error;
      return data?.[0] || null;
    } catch (err) {
      console.error('Erro ao criar cliente:', err);
      throw err;
    }
  },

  async getClient(id: string) {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Erro ao buscar cliente:', err);
      throw err;
    }
  },

  async updateClient(id: string, clientData: Partial<Client>) {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .update(clientData)
        .eq('id', id)
        .select();

      if (error) throw error;
      return data?.[0] || null;
    } catch (err) {
      console.error('Erro ao atualizar cliente:', err);
      throw err;
    }
  },

  async deleteClient(id: string) {
    try {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
      throw err;
    }
  },

  async listClients(userId?: string, userRole?: string, advogadoId?: string) {
    try {
      const query = supabase
        .from('clientes')
        .select('*')
        .order('criado_em', { ascending: false });

      if (userRole !== 'admin' && advogadoId) {
        query.eq('advogado_id', advogadoId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Erro ao listar clientes:', err);
      return [];
    }
  }
};