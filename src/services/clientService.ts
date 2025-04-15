import { supabase } from '@/integrations/supabase/client';
import type { Client } from '@/types/client';

// Export the clientService with minimal changes to fix the type issues
export const clientService = {
  async createClient(clientData: Omit<Client, 'id' | 'criado_em'>, userId: string, advogadoId?: string) {
    const { data, error } = await supabase
      .from('clientes')
      .insert({
        ...clientData,
        user_id: userId,
        advogado_id: advogadoId ?? null
      })
      .select();

    if (error) throw error;
    return {
  id: data?.[0]?.id ?? '',
  nome: data?.[0]?.nome ?? '',
  taxId: data?.[0]?.taxId ?? '',
  nif: data?.[0]?.nif ?? '',
  telefone: data?.[0]?.telefone ?? '',
  email: data?.[0]?.email ?? '',
  morada: data?.[0]?.morada ?? '',
  estado: data?.[0]?.estado ?? 'prospect',
  criado_em: data?.[0]?.criado_em ? new Date(data?.[0]?.criado_em) : new Date(),
  user_id: data?.[0]?.user_id ?? '',
  advogado_id: data?.[0]?.advogado_id ?? '';
};
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
    return {
  id: data?.[0]?.id ?? '',
  name: data?.[0]?.nome ?? '',
  taxId: data?.[0]?.taxId ?? '',
  nif: data?.[0]?.nif ?? '',
  phone: data?.[0]?.telefone ?? '',
  email: data?.[0]?.email ?? '',
  address: data?.[0]?.morada ?? '',
  status: data?.[0]?.estado ?? 'prospect',
  createdAt: data?.[0]?.criado_em ? new Date(data?.[0]?.criado_em) : new Date(),
  userId: data?.[0]?.user_id ?? '',
  lawyerId: data?.[0]?.advogado_id ?? '';
};
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