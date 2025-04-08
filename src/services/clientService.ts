import { supabase } from "@/integrations/supabase/client";
import { Client, CreateClientDTO, UpdateClientDTO } from "@/types/client";

export const clientService = {
  // Buscar todos os clientes associados ao usuário atual
  async getClients(): Promise<Client[]> {
    const { data: userData, error: authError } = await supabase.auth.getUser();
    
    if (authError || !userData.user) {
      console.error("Erro de autenticação:", authError);
      throw new Error("Usuário não autenticado");
    }
    
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("name", { ascending: true });
      
    if (error) {
      console.error("Erro ao buscar clientes:", error);
      throw new Error(error.message || "Não foi possível carregar os clientes");
    }
    
    // Mapear os dados do Supabase para o formato esperado pelo frontend
    return data.map(item => ({
      id: item.id,
      name: item.name || '',
      nif: item.nif || '',
      email: item.email || '',
      phone: item.phone || '',
      address: item.address || '',
      createdAt: item.created_at || new Date().toISOString(),
      updatedAt: item.updated_at || new Date().toISOString(),
      userId: item.user_id,
      status: item.status || 'active',
      notes: item.notes
    }));
  },
  
  // Buscar cliente por ID
  async getClientById(id: string): Promise<Client | null> {
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .eq("id", id)
      .single();
      
    if (error) {
      console.error("Erro ao buscar cliente:", error);
      throw new Error("Não foi possível carregar o cliente");
    }
    
    return data as Client;
  },
  
  // Criar novo cliente
  async createClient(client: CreateClientDTO): Promise<Client> {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error("Usuário não autenticado");
    }
    
    const newClient = {
      ...client,
      user_id: user.user?.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: client.status || "active"
    };
    
    const { data, error } = await supabase
      .from("clientes")
      .insert([newClient])
      .select()
      .single();
      
    if (error) {
      console.error("Erro ao criar cliente:", error);
      throw new Error("Não foi possível criar o cliente");
    }
    
    return data as Client;
  },
  
  // Atualizar cliente existente
  async updateClient(id: string, client: UpdateClientDTO): Promise<Client> {
    const updateData = {
      ...client,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from("clientes")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
      
    if (error) {
      console.error("Erro ao atualizar cliente:", error);
      throw new Error("Não foi possível atualizar o cliente");
    }
    
    return data as Client;
  },
  
  // Excluir cliente
  async deleteClient(id: string): Promise<void> {
    // Verificar se o cliente existe antes de excluir
    const { data: checkData, error: checkError } = await supabase
      .from("clientes")
      .select("id")
      .eq("id", id)
      .single();
      
    if (checkError) {
      console.error("Erro ao verificar cliente:", checkError);
      throw new Error("Não foi possível encontrar o cliente");
    }
    
    if (!checkData) {
      throw new Error("Cliente não encontrado");
    }
    
    const { error } = await supabase
      .from("clientes")
      .delete()
      .eq("id", id);
      
    if (error) {
      console.error("Erro ao excluir cliente:", error);
      throw new Error(error.message || "Não foi possível excluir o cliente");
    }
  },
  
  // Buscar clientes por status
  async getClientsByStatus(status: string): Promise<Client[]> {
    const { data: userData, error: authError } = await supabase.auth.getUser();
    
    if (authError || !userData.user) {
      console.error("Erro de autenticação:", authError);
      throw new Error("Usuário não autenticado");
    }
    
    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .eq("user_id", userData.user.id)
      .eq("status", status)
      .order("name", { ascending: true });
      
    if (error) {
      console.error("Erro ao buscar clientes por status:", error);
      throw new Error(error.message || "Não foi possível carregar os clientes");
    }
    
    // Mapear os dados do Supabase para o formato esperado pelo frontend
    return data.map(item => ({
      id: item.id,
      name: item.name || '',
      nif: item.nif || '',
      email: item.email || '',
      phone: item.phone || '',
      address: item.address || '',
      createdAt: item.created_at || new Date().toISOString(),
      updatedAt: item.updated_at || new Date().toISOString(),
      userId: item.user_id,
      status: item.status || 'active',
      notes: item.notes
    }));
  }
};