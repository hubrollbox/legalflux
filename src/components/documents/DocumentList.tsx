
import React from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { getFileIcon, formatDate } from "./documentCardUtils.tsx";

interface DocumentListProps {
  documents: Array<{
    id: string;
    name: string;
    type: "document" | "action" | "precedent" | "strategy";
    size: string;
    updatedAt: string;
    owner: string;
    folder: string;
    process: string;
  }>;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-muted">
            <th className="text-left py-3 px-4">Nome</th>
            <th className="text-left py-3 px-4">Tipo</th>
            <th className="text-left py-3 px-4">Tamanho</th>
            <th className="text-left py-3 px-4">Atualizado</th>
            <th className="text-left py-3 px-4">Processo</th>
            <th className="text-right py-3 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id} className="border-t">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  {getFileIcon(doc.type)}
                  <span className="ml-2">{doc.name}</span>
                </div>
              </td>
              <td className="py-3 px-4 uppercase">{doc.type}</td>
              <td className="py-3 px-4">{doc.size}</td>
              <td className="py-3 px-4">{formatDate(doc.updatedAt)}</td>
              <td className="py-3 px-4">{doc.process}</td>
              <td className="py-3 px-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Ver</DropdownMenuItem>
                    <DropdownMenuItem>Descarregar</DropdownMenuItem>
                    <DropdownMenuItem>Partilhar</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {documents.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum documento encontrado com os critérios de pesquisa atuais.
        </div>
      )}
    </div>
  );
};

export default DocumentList;
