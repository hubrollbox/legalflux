
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, FileText, Loader2, ExternalLink } from "lucide-react";
import type { Client } from "@/types/client";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface ClientServiceType {
  getClient: (id: string) => Promise<any>;
}

const clientService: ClientServiceType = {
  getClient: async (id: string) => {
    // Simulação de serviço
    return Promise.resolve({
      id,
      nome: "Cliente Exemplo",
      nif: "123456789",
      email: "cliente@exemplo.com",
      telefone: "912345678",
      morada: "Rua Exemplo, 123",
      estado: "active",
      user_id: "user1",
      advogado_id: "adv1",
      criado_em: new Date().toISOString(),
    });
  }
};

interface ClientDetailsProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  onRefresh?: () => void;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({
  client,
  onEdit,
  onDelete,
  onRefresh,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Ativo</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500">Inativo</Badge>;
      case "prospect":
        return <Badge className="bg-blue-500">Potencial</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleViewProcesses = () => {
    navigate(`/processes?clientId=${client.id}`);
  };
  
  const handleRefreshClient = async () => {
    if (!onRefresh) {
      setIsLoading(true);
      try {
        const updatedClient = await clientService.getClient(client.id);
        // Usando type assertion para acessar as propriedades em português
        const apiClient = updatedClient as unknown as {
          id: string;
          nome?: string;
          nif?: string;
          email?: string;
          telefone?: string;
          morada?: string;
          estado?: string;
          notas?: string;
          user_id: string;
          advogado_id: string | null;
          criado_em: string | null;
        };
        
        const mappedClient: Client = {
          id: apiClient.id,
          name: apiClient.nome || "Unknown",
          nif: apiClient.nif || "Unknown",
          taxId: apiClient.nif || "Unknown",
          email: apiClient.email || "Unknown",
          phone: apiClient.telefone || "Unknown",
          address: apiClient.morada || "Unknown",
          status: (apiClient.estado as Client["status"]) || "prospect",
          notes: apiClient.notas || "",
          userId: String(apiClient.user_id),
          lawyerId: apiClient.advogado_id ? String(apiClient.advogado_id) : undefined,
          createdAt: apiClient.criado_em ? new Date(apiClient.criado_em) : new Date(),
        };
        onEdit(mappedClient);
        toast({
          title: "Dados atualizados",
          description: "Os dados do cliente foram atualizados com sucesso."
        });
      } catch (error: any) {
        console.error("Erro ao atualizar dados do cliente:", error);
        toast({
          variant: "destructive",
          title: "Erro",
          description: error.message || "Não foi possível atualizar os dados do cliente."
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      onRefresh();
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-2xl font-bold">{client.name}</CardTitle>
          <p className="text-sm text-muted-foreground">ID: {client.id}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge(client.status)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Tax ID</h3>
            <p className="text-base">{client.taxId}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <p className="text-base">{client.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
            <p className="text-base">{client.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Creation Date</h3>
            <p className="text-base">{new Date(client.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
          <p className="text-base">{client.address}</p>
        </div>

        {client.notes && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-muted-foreground">Notas</h3>
            <p className="text-base whitespace-pre-line">{client.notes}</p>
          </div>
        )}

        <div className="flex flex-wrap justify-end gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshClient}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ExternalLink className="mr-2 h-4 w-4" />
            )}
            Atualizar Dados
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewProcesses}
          >
            <FileText className="mr-2 h-4 w-4" />
            Ver Processos
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(client)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(client)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientDetails;
