
import React from "react";
import { Upload, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentsHeaderProps {
  canCreateDocument: boolean;
}

const DocumentsHeader: React.FC<DocumentsHeaderProps> = ({ canCreateDocument }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">Documentos</h1>
        <p className="text-muted-foreground">
          Gerencie todos os documentos dos seus processos jurídicos
        </p>
      </div>
      {canCreateDocument && (
        <div className="flex space-x-2">
          <Button>
            <Upload className="mr-2 h-4 w-4" /> Carregar
          </Button>
          <Button variant="outline">
            <FolderPlus className="mr-2 h-4 w-4" /> Nova Pasta
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentsHeader;
