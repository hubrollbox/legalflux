import { supabase } from "@/integrations/supabase/client";
import { Process, CreateProcessDTO, UpdateProcessDTO, ProcessStatus } from "@/types/process";

import { createClient } from '@/integrations/supabase/client';
import { Process } from '@/types/process';
import { useAuth } from '@/hooks/useAuth';

export const processService = {
  async createProcess(processData: Omit<Process, 'id' | 'createdAt' | 'status'>) {
    const supabase = createClient();
    const { user } = useAuth();

    const { data, error } = await supabase
      .from('processes')
      .insert({
        ...processData,
        status: 'aberto',
        created_by: user?.id,
        organization_id: user?.organizationId
      })
      .select();

    if (error) throw error;
    return data[0];
  },

  async getProcess(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('processes')
      .select('*, client:client_id(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProcess(id: string, processData: Partial<Process>) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('processes')
      .update(processData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  async deleteProcess(id: string) {
    const supabase = createClient();
    const { error } = await supabase
      .from('processes')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async listProcesses() {
    const supabase = createClient();
    const { user } = useAuth();

    const query = supabase
      .from('processes')
      .select('*, client:client_id(*)')
      .order('created_at', { ascending: false });

    if (user?.role !== 'admin') {
      query.eq('organization_id', user?.organizationId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async getProcessesByStatus(status: string) {
    const supabase = createClient();
    const { user } = useAuth();

    const query = supabase
      .from('processes')
      .select('*, client:client_id(*)')
      .eq('status', status);

    if (user?.role !== 'admin') {
      query.eq('organization_id', user?.organizationId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async getProcessesByClientId(clientId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('processes')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};