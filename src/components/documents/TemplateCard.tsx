
import React from "react";
import { FileText, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    type: "document" | "action" | "precedent" | "strategy";
    size: string;
    description: string;
    updatedAt: Date;
    category: string;
  };
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  return (
    <Card key={template.id} className="overflow-hidden border border-accent/20 hover:border-accent/50 transition-all">
      <CardContent className="p-0">
        <div className="p-4 flex flex-col items-center text-center">
          <FileText className="h-10 w-10 text-blue-500" />
          <h3 className="mt-2 font-medium truncate w-full">{template.name}</h3>
          <p className="text-sm text-muted-foreground">{template.size}</p>
          <p className="text-xs mt-1 line-clamp-2 text-muted-foreground">
            {template.description}
          </p>
          <Badge variant="outline" className="mt-2">
            {template.category}
          </Badge>
        </div>
        <div className="bg-muted p-2 flex justify-between items-center">
          <span className="text-xs">Atualizado: {formatDate(template.updatedAt.toString())}</span>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
