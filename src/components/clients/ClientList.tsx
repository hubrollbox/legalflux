import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Edit, Trash2, FileText } from "lucide-react";
import { Client } from "@/types/client";

interface ClientListProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  onView: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({
  clients,
  onEdit,
  onDelete,
  onView,
}) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

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

  const handleViewProcesses = (clientId: string) => {
    navigate(`/processes?clientId=${clientId}`);
  };

  // Renderiza a lista de clientes em formato de cards para dispositivos móveis
  const renderMobileView = () => (
    <div className="space-y-4">
      {clients.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          Nenhum cliente encontrado
        </div>
      ) : (
        clients.map((client) => (
          <Card key={client.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-base">{client.name}</h3>
                  <p className="text-sm text-muted-foreground">NIF: {client.nif}</p>
                </div>
                <div>{getStatusBadge(client.status)}</div>
              </div>
              
              <div className="space-y-1 mb-3">
                <div className="flex items-center text-sm">
                  <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{client.phone}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t">
                <Button variant="ghost" size="sm" onClick={() => onView(client)}>
                  <Eye className="h-4 w-4 mr-1" /> Ver
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEdit(client)}>
                  <Edit className="h-4 w-4 mr-1" /> Editar
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleViewProcesses(client.id)}>
                  <FileText className="h-4 w-4 mr-1" /> Processos
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600" onClick={() => onDelete(client)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );

  // Renderiza a tabela para dispositivos maiores
  const renderTableView = () => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>NIF</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                Nenhum cliente encontrado
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.nif}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{getStatusBadge(client.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onView(client)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(client)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewProcesses(client.id)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Ver processos
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(client)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  return isMobile ? renderMobileView() : renderTableView();
};

export default ClientList;