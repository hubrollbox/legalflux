import { supabase } from '@/integrations/supabase/client';
import type { Client } from '@/types/client';

// Export the clientService with minimal changes to fix the type issues
export const clientService = {
  async createClient(clientData: Omit<Client, 'id' | 'createdAt'>, userId: string, advogadoId?: string) {
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
      .select('id, name, nif, telefone, email, morada, estado, created_at, user_id, advogado_id')
      .single();

    if (error) throw error;
    if (!data) {
      throw new Error('No data returned from database');
    }
    
    // Explicitly type the database response to match the expected structure
    const dbClient = data as unknown as {
      id: string;
      nome: string;
      nif: string;
      telefone: string;
      email: string;
      morada: string;
      estado: string;
      created_at: string;
      user_id: string;
      advogado_id: string | null;
    };
    
    return {
      id: dbClient.id ?? '',
      name: dbClient.nome ?? '',
      taxId: dbClient.nif ?? '',
      phone: dbClient.telefone ?? '',
      email: dbClient.email ?? '',
      address: dbClient.morada ?? '',
      status: dbClient.estado ?? 'prospect',
      createdAt: dbClient.created_at ? new Date(dbClient.created_at) : new Date(),
      userId: dbClient.user_id ?? '',
      lawyerId: dbClient.advogado_id ?? ''
    } as Client;
  },

  async getClient(id: string) {
    const { data, error } = await supabase
      .from('clientes')
      .select('id, name, nif, telefone, email, morada, estado, created_at, user_id, advogado_id')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      throw new Error('No data returned from database');
    }
    
    // Explicitly type the database response to match the expected structure
    const dbClient = data as unknown as {
      id: string;
      nome: string;
      nif: string;
      telefone: string;
      email: string;
      morada: string;
      estado: string;
      created_at: string;
      user_id: string;
      advogado_id: string | null;
    };
    
    return {
      id: dbClient.id ?? '',
      name: dbClient.nome ?? '',
      taxId: dbClient.nif ?? '',
      phone: dbClient.telefone ?? '',
      email: dbClient.email ?? '',
      address: dbClient.morada ?? '',
      status: dbClient.estado ?? 'prospect',
      createdAt: dbClient.created_at ? new Date(dbClient.created_at) : new Date(),
      userId: dbClient.user_id ?? '',
      lawyerId: dbClient.advogado_id ?? ''
    } as Client;
  },

  async updateClient(id: string, clientData: Partial<Client>) {
    // Create an update object with only the properties that are provided
    const updateData: Record<string, any> = {};
    
    if (clientData.name !== undefined) updateData.name = clientData.name;
    if (clientData.taxId !== undefined) updateData.nif = clientData.taxId;
    if (clientData.phone !== undefined) updateData.telefone = clientData.phone;
    if (clientData.email !== undefined) updateData.email = clientData.email;
    if (clientData.address !== undefined) updateData.morada = clientData.address;
    if (clientData.status !== undefined) updateData.estado = clientData.status;
    if (clientData.lawyerId !== undefined) updateData.advogado_id = clientData.lawyerId;
    
    const { data, error } = await supabase
      .from('clientes')
      .update(updateData)
      .eq('id', id)
      .select('id, nome, nif, telefone, email, morada, estado, created_at, user_id, advogado_id')
      .single();

    if (error) throw error;
    if (!data) {
      throw new Error('No data returned from database');
    }
    
    // Explicitly type the database response to match the expected structure
    // First cast to unknown to avoid direct type assertion errors
    const dbClient = (data as unknown) as {
      id: string;
      nome: string;
      nif: string;
      telefone: string;
      email: string;
      morada: string;
      estado: string;
      created_at: string;
      user_id: string;
      advogado_id: string | null;
    };
    
    return {
      id: dbClient.id ?? '',
      name: dbClient.nome ?? '',
      taxId: dbClient.nif ?? '',
      phone: dbClient.telefone ?? '',
      email: dbClient.email ?? '',
      address: dbClient.morada ?? '',
      status: dbClient.estado ?? 'prospect',
      createdAt: dbClient.created_at ? new Date(dbClient.created_at) : new Date(),
      userId: dbClient.user_id ?? '',
      lawyerId: dbClient.advogado_id ?? ''
    } as Client;
  },

  async listClients(userRole?: string, advogadoId?: string): Promise<Client[]> {
    const query = supabase
      .from('clientes')
      .select('id, nome, nif, telefone, email, morada, estado, created_at, user_id, advogado_id')
      .order('created_at', { ascending: false });

    if (userRole === 'advogado' && advogadoId) {
      query.eq('advogado_id', advogadoId);
    }

    const { data, error } = await query;

    if (error) throw error;
    
    // Explicitly type the database response items to match the expected structure
    type DbClient = {
      id: string;
      nome: string;
      nif: string;
      telefone: string;
      email: string;
      morada: string;
      estado: string;
      created_at: string;
      user_id: string;
      advogado_id: string | null;
    };
    
    return (data as unknown as DbClient[]).map(item => ({
      id: item.id ?? '',
      name: item.nome ?? '',
      taxId: item.nif ?? '',
      phone: item.telefone ?? '',
      email: item.email ?? '',
      address: item.morada ?? '',
      status: item.estado ?? 'prospect',
      createdAt: item.created_at ? new Date(item.created_at) : new Date(),
      userId: item.user_id ?? '',
      lawyerId: item.advogado_id ?? ''
    })) as Client[];
  }
};