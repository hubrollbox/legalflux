import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Filter, Download, MoreHorizontal, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EmptyState from "@/components/ui/EmptyState";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ClientForm from "@/components/clients/ClientForm";
import ClientList from "@/components/clients/ClientList";
import ClientDetails from "@/components/clients/ClientDetails";
import { Client, ClientStatus, CreateClientDTO, UpdateClientDTO } from "@/types/client";
import { clientService } from "@/services/clientService";
import { Container } from "@/components/ui/container";
import { supabase } from "@/integrations/supabase/client";

const Clients = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Estados para gerenciar os clientes e filtros
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [error, setError] = useState<string | null>(null);
  
  // Estados para gerenciar os diálogos
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verificar autenticação e carregar clientes ao montar o componente
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data || !data.session) {
        navigate('/login');
        toast({
          variant: "destructive",
          title: "Não autenticado",
          description: "Você precisa estar logado para acessar esta página.",
        });
        return;
      }
      loadClients();
    };
    
    checkAuth();
  }, [navigate]);

  // Filtrar clientes quando o termo de busca ou filtro de status mudar
  useEffect(() => {
    filterClients();
  }, [searchTerm, statusFilter, clients]);

  // Função para carregar os clientes do serviço
  const loadClients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await clientService.getClients();
      setClients(data);
    } catch (error: any) {
      console.error("Erro ao carregar clientes:", error);
      setError(error.message || "Não foi possível carregar os clientes");
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os clientes. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para filtrar clientes com base no termo de busca e filtro de status
  const filterClients = () => {
    let filtered = [...clients];

    // Aplicar filtro de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(term) ||
          client.email.toLowerCase().includes(term) ||
          client.nif.includes(term) ||
          client.phone.includes(term)
      );
    }

    // Aplicar filtro de status
    if (statusFilter !== "all") {
      filtered = filtered.filter((client) => client.status === statusFilter);
    }

    setFilteredClients(filtered);
  };

  // Funções para gerenciar os diálogos
  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleOpenEditDialog = (client: Client) => {
    setSelectedClient(client);
    setIsEditDialogOpen(true);
  };

  const handleOpenViewDialog = (client: Client) => {
    setSelectedClient(client);
    setIsViewDialogOpen(true);
  };

  const handleOpenDeleteDialog = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteDialogOpen(true);
  };

  // Funções para criar, atualizar e excluir clientes
  const handleCreateClient = async (data: CreateClientDTO) => {
    setIsSubmitting(true);
    try {
      const newClient = await clientService.createClient(data);
      toast({
        title: "Cliente criado",
        description: "Cliente criado com sucesso.",
      });
      setIsCreateDialogOpen(false);
      // Atualiza a lista sem precisar recarregar todos os clientes
      setClients(prevClients => [...prevClients, newClient]);
    } catch (error: any) {
      console.error("Erro ao criar cliente:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Não foi possível criar o cliente. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateClient = async (data: UpdateClientDTO) => {
    if (!selectedClient) return;

    setIsSubmitting(true);
    try {
      const updatedClient = await clientService.updateClient(selectedClient.id, data);
      toast({
        title: "Cliente atualizado",
        description: "Cliente atualizado com sucesso.",
      });
      setIsEditDialogOpen(false);
      // Atualiza o cliente na lista sem precisar recarregar todos
      setClients(prevClients => 
        prevClients.map(client => 
          client.id === selectedClient.id ? updatedClient : client
        )
      );
      setSelectedClient(null);
    } catch (error: any) {
      console.error("Erro ao atualizar cliente:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Não foi possível atualizar o cliente. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClient = async () => {
    if (!selectedClient) return;

    setIsSubmitting(true);
    try {
      await clientService.deleteClient(selectedClient.id);
      toast({
        title: "Cliente excluído",
        description: "Cliente excluído com sucesso.",
      });
      setIsDeleteDialogOpen(false);
      // Remove o cliente da lista sem precisar recarregar todos
      setClients(prevClients => 
        prevClients.filter(client => client.id !== selectedClient.id)
      );
      setSelectedClient(null);
    } catch (error: any) {
      console.error("Erro ao excluir cliente:", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Não foi possível excluir o cliente. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <SectionHeader title="Clientes" description="Gerencie seus clientes e visualize informações importantes." />
      <Container>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleOpenCreateDialog}>
            <UserPlus className="mr-2 h-4 w-4" /> Novo Cliente
          </Button>
        </div>

        {isLoading ? (
          <p>Carregando clientes...</p>
        ) : error ? (
          <div className="flex items-center space-x-2">
            <AlertCircle className="text-red-500" />
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <EmptyState title="Nenhum cliente encontrado" description="Tente ajustar seus filtros ou adicionar novos clientes." />
        ) : (
          <ClientList clients={filteredClients} onEdit={handleOpenEditDialog} onView={handleOpenViewDialog} onDelete={handleOpenDeleteDialog} />
        )}

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
            </DialogHeader>
            <ClientForm onSubmit={handleCreateClient} isSubmitting={isSubmitting} />
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Cliente</DialogTitle>
            </DialogHeader>
            {selectedClient && <ClientForm client={selectedClient} onSubmit={handleUpdateClient} isSubmitting={isSubmitting} />}
          </DialogContent>
        </Dialog>

        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Detalhes do Cliente</DialogTitle>
            </DialogHeader>
            {selectedClient && <ClientDetails client={selectedClient} />}
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir Cliente</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza de que deseja excluir este cliente? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteClient} disabled={isSubmitting}>Excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Container>
    </DashboardLayout>
  );
};

export default Clients;

