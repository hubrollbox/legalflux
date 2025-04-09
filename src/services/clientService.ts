import { createClient } from '@/integrations/supabase/client';
import { Client } from '@/types/client';
import { supabase } from '@/integrations/supabase/client';

// Export a single clientService object that uses the existing ClientService methods
export const clientService = {
  async createClient(clientData: Omit<Client, 'id' | 'createdAt'>, userId: string, organizationId?: string) {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .insert({
          ...clientData,
          user_id: userId,
          advogado_id: organizationId
        })
        .select();

      if (error) throw error;
      return data[0];
    } catch (err) {
      console.error('Erro ao criar cliente:', err);
      throw err;
    }
  }, // Added comma here
  async getClient(id: string) {
    const { data, error } = await supabase
      .from('clientes')  // Changed from 'clients' to 'clientes'
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateClient(id: string, clientData: Partial<Client>) {
    const { data, error } = await supabase
      .from('clientes')  // Changed from 'clients' to 'clientes'
      .update(clientData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  async deleteClient(id: string) {
    const { error } = await supabase
      .from('clientes')  // Changed from 'clients' to 'clientes'
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async listClients(userId?: string, userRole?: string, organizationId?: string) {
    const query = supabase
      .from('clientes')
      .select('*')
      .order('criado_em', { ascending: false }); // Changed from created_at to criado_em

    if (userRole !== 'admin' && organizationId) {
      query.eq('advogado_id', organizationId); // Changed from organization_id to advogado_id
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }
};