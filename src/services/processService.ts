import { supabase } from "../../integrations/supabase/client";
import type { Process, CreateProcessDTO, UpdateProcessDTO, ProcessStatus } from "../types/process";

export const processService = {
  async createProcess(processData: CreateProcessDTO, userId: string, organizationId: string): Promise<Process> {
    // Validate required fields
    if (!processData.title || !processData.number || !processData.type) {
      throw new Error('Title, number and type are required fields');
    }
    
    // Validate organization ID format
    if (!organizationId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      throw new Error('Invalid organization ID format');
    }

    const { data, error } = await supabase
      .from('processes')
      .insert({
        ...processData,
        status: 'aberto',
        created_by: userId,
        organization_id: organizationId
      })
      .select();

    if (error) {
      console.error('Supabase createProcess error:', error);
      throw new Error(`Failed to create process: ${error.message}`);
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned after process creation');
    }
    
    return data[0];
  },

  async getProcess(id: string): Promise<Process> {
    const { data, error } = await supabase
      .from('processes')
      .select('*, client:client_id(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async updateProcess(id: string, processData: UpdateProcessDTO): Promise<Process> {
    // Validate process ID format
    if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      throw new Error('Invalid process ID format');
    }
    
    const { data, error } = await supabase
      .from('processes')
      .update(processData)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase updateProcess error:', error);
      throw new Error(`Failed to update process: ${error.message}`);
    }
    
    if (!data || data.length === 0) {
      throw new Error('No data returned after process update');
    }
    
    return data[0];
  },

  async deleteProcess(id: string): Promise<void> {
    // Validate process ID format
    if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      throw new Error('Invalid process ID format');
    }
    
    const { error } = await supabase
      .from('processes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase deleteProcess error:', error);
      throw new Error(`Failed to delete process: ${error.message}`);
    }
  },

  async listProcesses(userRole?: string, organizationId?: string): Promise<Process[]> {
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

  async getProcessesByStatus(status: ProcessStatus, userRole?: string, organizationId?: string): Promise<Process[]> {
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

  async getProcessesByClientId(clientId: string): Promise<Process[]> {
    const { data, error } = await supabase
      .from('processes')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getCurrentProcess(): Promise<Process | null> {
    // Implementation to get the currently selected process
    // This could be enhanced to track the current process in state
    return null;
  }
};

export default processService;
export const getProcesses = processService.listProcesses;