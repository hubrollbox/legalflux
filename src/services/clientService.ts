import { supabase } from '@/integrations/supabase/client';
import type { Client } from '@/types/client';

// Export the clientService with minimal changes to fix the type issues
export const clientService = {
  async createClient(clientData: Omit<Client, 'id' | 'createdAt'>, userId: string, advogadoId?: string) {
    const { data, error } = await supabase
      .from('clientes')
      .insert({
        name: clientData.name,
        tax_id: clientData.taxId,
        phone: clientData.phone,
        email: clientData.email,
        address: clientData.address,
        status: clientData.status,
        user_id: userId,
        lawyer_id: advogadoId ?? null
      })
      .select('id, name, tax_id, phone, email, address, status, created_at, user_id, lawyer_id')
      .single();

    if (error) throw error;
    if (!data) {
      throw new Error('No data returned from database');
    }
    
    // Explicitly type the database response to match the expected structure
    const dbClient = data as {
      id: string;
      name: string;
      tax_id: string;
      phone: string;
      email: string;
      address: string;
      status: string;
      created_at: string;
      user_id: string;
      lawyer_id: string | null;
    };
    
    return {
      id: dbClient.id ?? '',
      name: dbClient.name ?? '',
      taxId: dbClient.tax_id ?? '',
      phone: dbClient.phone ?? '',
      email: dbClient.email ?? '',
      address: dbClient.address ?? '',
      status: dbClient.status ?? 'prospect',
      createdAt: dbClient.created_at ? new Date(dbClient.created_at) : new Date(),
      userId: dbClient.user_id ?? '',
      lawyerId: dbClient.lawyer_id ?? ''
    } as Client;
  },

  async getClient(id: string) {
    const { data, error } = await supabase
      .from('clientes')
      .select('id, name, tax_id, phone, email, address, status, created_at, user_id, lawyer_id')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      throw new Error('No data returned from database');
    }
    
    // Explicitly type the database response to match the expected structure
    const dbClient = data as {
      id: string;
      name: string;
      tax_id: string;
      phone: string;
      email: string;
      address: string;
      status: string;
      created_at: string;
      user_id: string;
      lawyer_id: string | null;
    };
    
    return {
      id: dbClient.id ?? '',
      name: dbClient.name ?? '',
      taxId: dbClient.tax_id ?? '',
      phone: dbClient.phone ?? '',
      email: dbClient.email ?? '',
      address: dbClient.address ?? '',
      status: dbClient.status ?? 'prospect',
      createdAt: dbClient.created_at ? new Date(dbClient.created_at) : new Date(),
      userId: dbClient.user_id ?? '',
      lawyerId: dbClient.lawyer_id ?? ''
    } as Client;
  },

  async updateClient(id: string, clientData: Partial<Client>) {
    // Create an update object with only the properties that are provided
    const updateData: Record<string, any> = {};
    
    if (clientData.name !== undefined) updateData.name = clientData.name;
    if (clientData.taxId !== undefined) updateData.tax_id = clientData.taxId;
    if (clientData.phone !== undefined) updateData.phone = clientData.phone;
    if (clientData.email !== undefined) updateData.email = clientData.email;
    if (clientData.address !== undefined) updateData.address = clientData.address;
    if (clientData.status !== undefined) updateData.status = clientData.status;
    if (clientData.lawyerId !== undefined) updateData.lawyer_id = clientData.lawyerId;
    
    const { data, error } = await supabase
      .from('clientes')
      .update(updateData)
      .eq('id', id)
      .select('id, name, tax_id, phone, email, address, status, created_at, user_id, lawyer_id')
      .single();

    if (error) throw error;
    if (!data) {
      throw new Error('No data returned from database');
    }
    
    // Explicitly type the database response to match the expected structure
    const dbClient = data as {
      id: string;
      name: string;
      tax_id: string;
      phone: string;
      email: string;
      address: string;
      status: string;
      created_at: string;
      user_id: string;
      lawyer_id: string | null;
    };
    
    return {
      id: dbClient.id ?? '',
      name: dbClient.name ?? '',
      taxId: dbClient.tax_id ?? '',
      phone: dbClient.phone ?? '',
      email: dbClient.email ?? '',
      address: dbClient.address ?? '',
      status: dbClient.status ?? 'prospect',
      createdAt: dbClient.created_at ? new Date(dbClient.created_at) : new Date(),
      userId: dbClient.user_id ?? '',
      lawyerId: dbClient.lawyer_id ?? ''
    } as Client;
  },

  async listClients(userRole?: string, advogadoId?: string): Promise<Client[]> {
    const query = supabase
      .from('clientes')
      .select('id, name, tax_id, phone, email, address, status, created_at, user_id, lawyer_id')
      .order('created_at', { ascending: false });

    if (userRole === 'advogado' && advogadoId) {
      query.eq('lawyer_id', advogadoId);
    }

    const { data, error } = await query;

    if (error) throw error;
    
    // Explicitly type the database response items to match the expected structure
    type DbClient = {
      id: string;
      name: string;
      tax_id: string;
      phone: string;
      email: string;
      address: string;
      status: string;
      created_at: string;
      user_id: string;
      lawyer_id: string | null;
    };
    
    return (data as DbClient[]).map(item => ({
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