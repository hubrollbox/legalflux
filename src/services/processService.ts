import { supabase } from "@/integrations/supabase/client";
import { Process, CreateProcessDTO, UpdateProcessDTO, ProcessStatus } from "@/types/process";

export const processService = {
  // Buscar todos os processos associados ao usuário atual
  async getProcesses(): Promise<Process[]> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("Usuário não autenticado");
    }
    
    const { data, error } = await supabase
      .from("processos")
      .select("*, clientes(*)")
      .eq("user_id", user.user?.id)
      .order("created_at", { ascending: false });
      
    if (error) {
      console.error("Erro ao buscar processos:", error);
      throw new Error("Não foi possível carregar os processos");
    }
    
    return data as Process[];
  },
  
  // Buscar processos por cliente
  async getProcessesByClient(clientId: string): Promise<Process[]> {
    const { data, error } = await supabase
      .from("processos")
      .select("*, clientes(*)")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });
      
    if (error) {
      console.error("Erro ao buscar processos do cliente:", error);
      throw new Error("Não foi possível carregar os processos do cliente");
    }
    
    return data as Process[];
  },
  
  // Buscar processo por ID
  async getProcessById(id: string): Promise<Process | null> {
    const { data, error } = await supabase
      .from("processos")
      .select("*, clientes(*)")
      .eq("id", id)
      .single();
      
    if (error) {
      console.error("Erro ao buscar processo:", error);
      throw new Error("Não foi possível carregar o processo");
    }
    
    return data as Process;
  },
  
  // Criar novo processo
  async createProcess(process: CreateProcessDTO): Promise<Process> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("Usuário não autenticado");
    }
    
    const newProcess = {
      ...process,
      user_id: user.user?.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: process.status || "new"
    };
    
    const { data, error } = await supabase
      .from("processos")
      .insert([newProcess])
      .select()
      .single();
      
    if (error) {
      console.error("Erro ao criar processo:", error);
      throw new Error("Não foi possível criar o processo");
    }
    
    return data as Process;
  },
  
  // Atualizar processo existente
  async updateProcess(id: string, process: UpdateProcessDTO): Promise<Process> {
    const updateData = {
      ...process,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from("processos")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
      
    if (error) {
      console.error("Erro ao atualizar processo:", error);
      throw new Error("Não foi possível atualizar o processo");
    }
    
    return data as Process;
  },
  
  // Atualizar status do processo
  async updateProcessStatus(id: string, status: ProcessStatus): Promise<Process> {
    const { data, error } = await supabase
      .from("processos")
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq("id", id)
      .select()
      .single();
      
    if (error) {
      console.error("Erro ao atualizar status do processo:", error);
      throw new Error("Não foi possível atualizar o status do processo");
    }
    
    return data as Process;
  },
  
  // Excluir processo
  async deleteProcess(id: string): Promise<void> {
    const { error } = await supabase
      .from("processos")
      .delete()
      .eq("id", id);
      
    if (error) {
      console.error("Erro ao excluir processo:", error);
      throw new Error("Não foi possível excluir o processo");
    }
  }
};