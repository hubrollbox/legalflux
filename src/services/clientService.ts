import { supabase } from '@/integrations/supabase/client';
import type { Client } from '@/types/client';

// Export the clientService with minimal changes to fix the type issues
export const clientService = {
  async createClient(clientData: Omit<Client, 'id' | 'criado_em'>, userId: string, advogadoId?: string) {
    const { data, error } = await supabase
      .from('clientes')
      .insert({
        nome: clientData.name,
        nif: clientData.taxId,
        telefone: clientData.phone,
        email: clientData.email,
        morada: clientData.address,
        estado: clientData.status,
        user_id: userId,
        advogado_id: advogadoId ?? null
      })
      .select('id, nome as name, nif as taxId, telefone as phone, email, morada as address, estado as status, criado_em as createdAt, user_id as userId, advogado_id as lawyerId')
      .returns<Client[]>();

    if (error) throw error;
    return {
      id: data?.[0]?.id ?? '',
      name: data?.[0]?.name ?? '',
      taxId: data?.[0]?.taxId ?? '',

      phone: data?.[0]?.phone ?? '',
      email: data?.[0]?.email ?? '',
      address: data?.[0]?.address ?? '',
      status: data?.[0]?.status ?? 'prospect',
      createdAt: data?.[0]?.createdAt ? new Date(data?.[0]?.createdAt) : new Date(),
      userId: data?.[0]?.userId ?? '',
      lawyerId: data?.[0]?.lawyerId ?? ''
    };
  },

  async getClient(id: string) {
    const { data, error } = await supabase
      .from('clientes')
      .select('id, nome as name, nif as taxId, telefone as phone, email, morada as address, estado as status, criado_em as createdAt, user_id as userId, advogado_id as lawyerId')
      .eq('id', id)
      .single()
      .returns<Client>();

    if (error) throw error;
    return data.map(item => ({
      id: item.id,
      name: item.name,
      taxId: item.taxId,

      phone: item.phone,
      email: item.email,
      address: item.address,
      status: item.status,
      createdAt: new Date(item.createdAt),
      userId: item.userId,
      lawyerId: item.lawyerId
    })) as Client[];
  },

  async updateClient(id: string, clientData: Partial<Client>) {
    const { data, error } = await supabase
      .from('clientes')
      .update({
        nome: clientData.name,
        nif: clientData.taxId,
        telefone: clientData.phone,
        email: clientData.email,
        morada: clientData.address,
        estado: clientData.status,
        advogado_id: clientData.lawyerId
      })
      .eq('id', id)
      .select('id, nome as name, nif as taxId, telefone as phone, email, morada as address, estado as status, criado_em as createdAt, user_id as userId, advogado_id as lawyerId')
      .returns<Client[]>();

    if (error) throw error;
    return {
      id: data?.[0]?.id ?? '',
      name: data?.[0]?.name ?? '',
      taxId: data?.[0]?.taxId ?? '',

      phone: data?.[0]?.phone ?? '',
      email: data?.[0]?.email ?? '',
      address: data?.[0]?.address ?? '',
      status: data?.[0]?.status ?? 'prospect',
      createdAt: data?.[0]?.createdAt ? new Date(data?.[0]?.createdAt) : new Date(),
      userId: data?.[0]?.userId ?? '',
      lawyerId: data?.[0]?.lawyerId ?? ''
    } as Client;
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
      .select('id, nome as name, nif as taxId, telefone as phone, email, morada as address, estado as status, criado_em as createdAt, user_id as userId, advogado_id as lawyerId')
      .order('criado_em', { ascending: false });

    if (userRole !== 'admin' && advogadoId) {
      query.eq('advogado_id', advogadoId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data.map(item => ({
      id: item.id,
      name: item.name,
      taxId: item.taxId,

      phone: item.phone,
      email: item.email,
      address: item.address,
      status: item.status,
      createdAt: new Date(item.createdAt),
      userId: item.userId,
      lawyerId: item.lawyerId
    })) as Client[];
  }
};