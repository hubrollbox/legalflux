import { supabase } from "@/integrations/supabase/client";
import { Process, CreateProcessDTO, UpdateProcessDTO, ProcessStatus } from "@/types/process";

export const processService = {
  async createProcess(processData: Omit<Process, 'id' | 'createdAt' | 'status'>, userId: string, organizationId: string) {
    const { data, error } = await supabase
      .from('processes')
      .insert({
        ...processData,
        status: 'aberto',
        created_by: userId,
        organization_id: organizationId
      })
      .select();

    if (error) throw error;
    return data[0];
  },

  async getProcess(id: string) {
    const { data, error } = await supabase
      .from('processes')
      .select('*, client:client_id(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProcess(id: string, processData: Partial<Process>) {
    const { data, error } = await supabase
      .from('processes')
      .update(processData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  async deleteProcess(id: string) {
    const { error } = await supabase
      .from('processes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async listProcesses(userRole?: string, organizationId?: string) {
    const query = supabase
      .from('processes')
      .select('*, client:client_id(*)')
      .order('created_at', { ascending: false });

    if (userRole !== 'admin' && organizationId) {
      query.eq('organization_id', organizationId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async getProcessesByStatus(status: string, userRole?: string, organizationId?: string) {
    const query = supabase
      .from('processes')
      .select('*, client:client_id(*)')
      .eq('status', status);

    if (userRole !== 'admin' && organizationId) {
      query.eq('organization_id', organizationId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async getProcessesByClientId(clientId: string) {
    const { data, error } = await supabase
      .from('processes')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};