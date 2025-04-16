import { supabase } from '@/integrations/supabase/client';
import type { Client } from '@/types/client';

// Export the clientService with minimal changes to fix the type issues
export const clientService = {
  async createClient(clientData: Omit<Client, 'id' | 'criado_em'>, userId: string, advogadoId?: string) {
    const { data, error } = await supabase
      .from('clientes')
      .insert({
        name: clientData.name,
        nif: clientData.taxId,
        telefone: clientData.phone,
        email: clientData.email,
        morada: clientData.address,
        estado: clientData.status,
        user_id: userId,
        advogado_id: advogadoId ?? null
      })
      .select('id, name, nif as taxId, telefone as phone, email, morada as address, estado as status, criado_em as createdAt, user_id as userId, advogado_id as lawyerId')
      .single();

    if (error) throw error;
    return {
      id: data?.id ?? '',
      name: data?.name ?? '',
      taxId: data?.taxId ?? '',
      phone: data?.phone ?? '',
      email: data?.email ?? '',
      address: data?.address ?? '',
      status: data?.status ?? 'prospect',
      createdAt: data?.createdAt ? new Date(data.createdAt) : new Date(),
      userId: data?.userId ?? '',
      lawyerId: data?.lawyerId ?? ''
    };
  },

  async getClient(id: string) {
    const { data, error } = await supabase
      .from('clientes')
      .select('id, nome as name, nif as taxId, telefone as phone, email, morada as address, estado as status, criado_em as createdAt, user_id as userId, advogado_id as lawyerId')
      .eq('id', id)
      .single();

    if (error) throw error;
    return {
      ...data,
      taxId: data.nif,
      phone: data.telefone,
      address: data.morada,
      status: data.estado,
      createdAt: new Date(data.criado_em)
    } as Client;
  }

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
      .single();

    if (error) throw error;
    return {
      id: data?.id ?? '',
      name: data?.name ?? '',
      taxId: data?.taxId ?? '',
      phone: data?.phone ?? '',
      email: data?.email ?? '',
      address: data?.address ?? '',
      status: data?.status ?? 'prospect',
      createdAt: data?.createdAt ? new Date(data.createdAt) : new Date(),
      userId: data?.userId ?? '',
      lawyerId: data?.lawyerId ?? ''
    } as Client;
  },

  async deleteClient(id: string) {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async listClients(userId?: string, userRole?: string, advogadoId?: string): Promise<Client[]> {
    const query = supabase
      .from('clientes')
      .select('id, name, nif as taxId, telefone as phone, email, morada as address, estado as status, criado_em as createdAt, user_id as userId, advogado_id as lawyerId')
      .order('criado_em', { ascending: false });

    if (userRole === 'advogado' && advogadoId) {
      query.eq('advogado_id', advogadoId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data.map(item => ({
      ...item,
      taxId: item.nif,
      phone: item.telefone,
      address: item.morada,
      status: item.estado,
      createdAt: new Date(item.criado_em)
    })) as Client[];
  }
};