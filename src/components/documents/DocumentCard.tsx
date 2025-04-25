
import { FileText, FileImage, File, FileCode, MoreHorizontal, Eye, Download, Share2, Trash2, Tag, Check } from "lucide-react";
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
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import { getFileIcon, formatDate } from './documentCardUtils';

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
    fileUrl: string;  // Add this
    title: string;    // Add this
  };
}

const DocumentCard: React.FC<DocumentCardProps> = ({ doc }) => {
  const [isSigned, setIsSigned] = useState(false);
  const [signedAt, setSignedAt] = useState<string | null>(null);

  useEffect(() => {
    const savedSignature = localStorage.getItem(`doc-signed-${doc.id}`);
    if (savedSignature) {
      setIsSigned(true);
      setSignedAt(savedSignature);
    }
  }, [doc.id]);

  const handleSign = () => {
    const newSignedState = !isSigned;
    setIsSigned(newSignedState);
    if (newSignedState) {
      const timestamp = new Date().toISOString();
      setSignedAt(timestamp);
      localStorage.setItem(`doc-signed-${doc.id}`, timestamp);
    } else {
      setSignedAt(null);
      localStorage.removeItem(`doc-signed-${doc.id}`);
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 overflow-hidden ${isSigned ? 'border-green-500' : 'border-transparent'} border-2`}>
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
        <div className="flex justify-between items-start mb-2">
          <Button
            onClick={handleSign}
            variant={isSigned ? 'outline' : 'default'}
            size="sm"
            className="gap-2"
          >
            {isSigned ? (
              <>
                <Check className="h-4 w-4" />






                Assinado
              </>
            ) : (
              'Assinar Documento'
            )}
          </Button>
        </div>
        {doc.preview && (
          <div className="relative aspect-video rounded-md overflow-hidden mb-3 bg-muted">
            <Image 
              src={doc.fileUrl} 
              alt={doc.name}
              width={500}
              height={300}
            />
          </div>
        )}
        <div className="space-y-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <span>Atualizado em {formatDate(doc.updatedAt.toString())}</span>
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>Processo: {doc.process}</span>
          </div>
        </div>
        {signedAt && (
          <div className="text-xs text-muted-foreground mt-2">
            Assinado em: {formatDate(signedAt)}
          </div>
        )}
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
