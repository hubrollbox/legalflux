
import React from "react";
import { FileText, MoreHorizontal } from "lucide-react";
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
import { formatDate } from "./DocumentCard";

interface TemplateListProps {
  templates: Array<{
    id: string;
    name: string;
    type: "document" | "action" | "precedent" | "strategy";
    size: string;
    description: string;
    updatedAt: Date;
    category: string;
  }>;
}

const TemplateList: React.FC<TemplateListProps> = ({ templates }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-muted">
            <th className="text-left py-3 px-4">Nome</th>
            <th className="text-left py-3 px-4">Categoria</th>
            <th className="text-left py-3 px-4">Tamanho</th>
            <th className="text-left py-3 px-4">Atualizado</th>
            <th className="text-right py-3 px-4">Ações</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id} className="border-t">
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <FileText className="h-10 w-10 text-blue-500" />
                  <div className="ml-2">
                    <div>{template.name}</div>
                    <div className="text-xs text-muted-foreground">{template.description}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <Badge variant="outline">{template.category}</Badge>
              </td>
              <td className="py-3 px-4">{template.size}</td>
              <td className="py-3 px-4">{formatDate(template.updatedAt)}</td>
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
                    <DropdownMenuItem>Usar Template</DropdownMenuItem>
                    <DropdownMenuItem>Descarregar</DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {templates.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          Nenhum template encontrado com os critérios de pesquisa atuais.
        </div>
      )}
    </div>
  );
};

export default TemplateList;
