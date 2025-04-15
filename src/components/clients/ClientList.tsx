import React, { useState, useEffect } from 'react';
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
import type { Client } from "@/types/client";
import { useToast } from '@/components/ui/use-toast';
import { clientService } from '@/services/clientService';

interface ClientListProps {
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  onView: (client: Client) => void;
}

const ClientList: React.FC<ClientListProps> = ({ onEdit, onDelete, onView }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await clientService.listClients();
        setClients(data.map(client => ({
          id: client.id,
          name: client.nome || '',
          taxId: client.nif || '',
          phone: client.telefone || '',
          email: client.email || '',
          address: client.morada || '',
          status: client.estado || 'prospect',
          createdAt: client.criado_em ? new Date(client.criado_em) : new Date(),
          userId: client.user_id,
          lawyerId: client.advogado_id
        })));
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Falha ao carregar clientes',
          variant: 'destructive',
        });
      } finally {}
    };
    loadClients();
  }, []);
  const navigate = useNavigate();

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

  const handleViewProcesses = (client: Client) => {
    navigate(`/processes?clientId=${client.id}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tax ID</TableHead>
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
                <TableCell>{client.taxId}</TableCell>
                <TableCell>{client.email || ''}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleViewProcesses(client)}>
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
};

export default ClientList;