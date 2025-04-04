
import React from "react";
import { File, FileText, FileCode, FileImage, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Function to get the appropriate icon based on file type
export const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <File className="h-10 w-10 text-red-500" />;
    case "docx":
      return <FileText className="h-10 w-10 text-blue-500" />;
    case "xlsx":
      return <FileCode className="h-10 w-10 text-green-500" />;
    case "jpg":
    case "png":
      return <FileImage className="h-10 w-10 text-purple-500" />;
    default:
      return <FileText className="h-10 w-10 text-gray-500" />;
  }
};

// Function to format the date
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

interface DocumentCardProps {
  doc: {
    id: string;
    name: string;
    type: string;
    size: string;
    updatedAt: string;
    owner: string;
    folder: string;
    process: string;
  };
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc }) => {
  return (
    <Card key={doc.id} className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 flex flex-col items-center text-center">
          {getFileIcon(doc.type)}
          <h3 className="mt-2 font-medium truncate w-full">{doc.name}</h3>
          <p className="text-sm text-muted-foreground">{doc.size}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Atualizado: {formatDate(doc.updatedAt)}
          </p>
        </div>
        <div className="bg-muted p-2 flex justify-between items-center">
          <span className="text-xs truncate">{doc.process}</span>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
