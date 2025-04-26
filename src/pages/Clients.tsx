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
    filterClients();
    loadClients();
    toast;
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
    loadClients();
    toast;
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
  
  // Dados para o gráfico de estatísticas
  const chartData = [
    { name: "Ativos", value: clients.filter(c => c.status === "active").length },
    { name: "Inativos", value: clients.filter(c => c.status === "inactive").length },
    { name: "Potenciais", value: clients.filter(c => c.status === "prospect").length },
  ];

  return (
    <DashboardLayout>
      <Container>
        <SectionHeader
          title="Clientes"
          description="Gerencie seus clientes e visualize informações importantes."
        >
          <Button onClick={handleOpenCreateDialog}>
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </SectionHeader>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email, NIF ou telefone..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os estados</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
              <SelectItem value="prospect">Potenciais</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            {isLoading ? (
              <CardContent className="flex items-center justify-center p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p>Carregando clientes...</p>
                </div>
              </CardContent>
            ) : error ? (
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <AlertCircle className="h-12 w-12 text-red-500" />
                  <div>
                    <h3 className="text-lg font-medium">Erro ao carregar clientes</h3>
                    <p className="text-sm text-muted-foreground">{error}</p>
                  </div>
                  <Button onClick={loadClients}>Tentar novamente</Button>
                </div>
              </CardContent>
            ) : filteredClients.length === 0 ? (
              <CardContent className="p-6">
                <EmptyState
                  title="Nenhum cliente encontrado"
                  description={searchTerm || statusFilter !== "all" ? "Tente ajustar os filtros de busca." : "Comece adicionando um novo cliente."}
                  icon={UserPlus}
                  action={{
                    label: "Adicionar Cliente",
                    onClick: handleOpenCreateDialog,
                  }}
                />
              </CardContent>
            ) : (
              <ClientList
                clients={filteredClients}
                onEdit={handleOpenEditDialog}
                onDelete={handleOpenDeleteDialog}
                onView={handleOpenViewDialog}
              />
            )}
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Diálogo para criar cliente */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Novo Cliente</DialogTitle>
            </DialogHeader>
            <ClientForm
              onSubmit={handleCreateClient}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>

        {/* Diálogo para editar cliente */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Editar Cliente</DialogTitle>
            </DialogHeader>
            {selectedClient && (
              <ClientForm
                initialData={selectedClient}
                onSubmit={handleUpdateClient}
                isSubmitting={isSubmitting}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Diálogo para visualizar cliente */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Cliente</DialogTitle>
            </DialogHeader>
            {selectedClient && (
              <ClientDetails
                client={selectedClient}
                onEdit={(client) => {
                  setIsViewDialogOpen(false);
                  handleOpenEditDialog(client);
                }}
                onDelete={handleOpenDeleteDialog}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Diálogo de confirmação para excluir cliente */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir Cliente</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o cliente {selectedClient?.name}? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteClient}
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? "Excluindo..." : "Excluir"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Container>
    </DashboardLayout>
  );
};

export default Clients;

