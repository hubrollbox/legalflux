import { createClient } from '@/integrations/supabase/client';
import { Client } from '@/types/client';
import { useAuth } from '@/hooks/useAuth';

export const ClientService = {
  async createClient(clientData: Omit<Client, 'id' | 'createdAt'>) {
    const supabase = createClient();
    const { user } = useAuth();

    const { data, error } = await supabase
      .from('clients')
      .insert({
        ...clientData,
        created_by: user?.id,
        organization_id: user?.organizationId
      })
      .select();

    if (error) throw error;
    return data[0];
  },

  async getClient(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateClient(id: string, clientData: Partial<Client>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('clients')
      .update(clientData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  async deleteClient(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async listClients() {
    const supabase = createClient();
    const { user } = useAuth();

    const query = supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (user?.role !== 'admin') {
      query.eq('organization_id', user?.organizationId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }
};