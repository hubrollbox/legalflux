
import React from "react";
import { FileText, FileImage, FileArchive, File, FileCode, MoreHorizontal, Eye, Download, Share2, Trash2, Tag } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Function to get the appropriate icon based on file type
export const getFileIcon = (type: "pdf" | "docx" | "xlsx" | "jpg" | "png" | string) => {
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
    updatedAt: string | Date;
    owner: string;
    folder: string;
    process: string;
    preview?: string;
    tags?: string[];
  };
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getFileIcon(doc.type)}
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <h3 className="font-medium text-sm truncate max-w-[150px]">{doc.name}</h3>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{doc.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-xs text-muted-foreground">{doc.size}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" /> Visualizar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" /> Descarregar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" /> Partilhar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        {doc.preview && (
          <div className="relative aspect-video rounded-md overflow-hidden mb-3 bg-muted">
            <img 
              src={doc.preview} 
              alt={doc.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <span>Atualizado em {formatDate(doc.updatedAt)}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>Processo: {doc.process}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex flex-wrap gap-1">
          {doc.tags?.map((tag, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
