
import React from 'react';
import { MoreHorizontal, Eye, Edit, Trash2, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Process, ProcessStatus, ProcessType } from "@/types/process";

interface ProcessListProps {
  processes: Process[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddDocument: (id: string) => void;
}

const getStatusColor = (status: ProcessStatus) => {
  switch (status) {
    case "in_progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "new":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "archived":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const getStatusName = (status: ProcessStatus) => {
  switch (status) {
    case "in_progress":
      return "Em Curso";
    case "new":
      return "Novo";
    case "completed":
      return "Finalizado";
    case "archived":
      return "Arquivado";
    default:
      return status;
  }
};

const getProcessTypeName = (type: ProcessType) => {
  switch (type) {
    case "civil":
      return "Civil";
    case "criminal":
      return "Criminal";
    case "administrative":
      return "Administrativo";
    case "labor":
      return "Trabalhista";
    case "tax":
      return "Fiscal";
    case "other":
      return "Outro";
    default:
      return type;
  }
};

const ProcessList: React.FC<ProcessListProps> = ({
  processes,
  onView,
  onEdit,
  onDelete,
  onAddDocument,
}) => {
  // Format date safely
  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return "--";
    try {
      const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      console.error("Invalid date:", dateString);
      return "Data inválida";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Número</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Data Início</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                Nenhum processo encontrado
              </TableCell>
            </TableRow>
          ) : (
            processes.map((process) => (
              <TableRow key={process.id}>
                <TableCell className="font-medium">{process.number}</TableCell>
                <TableCell>{process.title}</TableCell>
                <TableCell>{process.clientName || process.clientId || "--"}</TableCell>
                <TableCell>{getProcessTypeName(process.type as ProcessType)}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(process.status as ProcessStatus)}>
                    {getStatusName(process.status as ProcessStatus)}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(process.startDate)}</TableCell>
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
                      <DropdownMenuItem onClick={() => onView(process.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(process.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onAddDocument(process.id)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Adicionar documento
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => onDelete(process.id)}
                        className="text-red-600 focus:text-red-600"
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

export default ProcessList;
