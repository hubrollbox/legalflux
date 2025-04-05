
import React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2 } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: "pending" | "approved" | "rejected";
  processNumber?: string;
}

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
}

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  document
}) => {
  if (!document) return null;

  const getDocumentTypeIcon = () => {
    switch (document.type.toLowerCase()) {
      case 'pdf':
        return "📄";
      case 'xlsx':
      case 'xls':
        return "📊";
      case 'docx':
      case 'doc':
        return "📝";
      case 'jpg':
      case 'jpeg':
      case 'png':
        return "🖼️";
      default:
        return "📎";
    }
  };

  const getDocumentPreview = () => {
    const type = document.type.toLowerCase();
    
    // For images, show the actual image
    if (type === 'jpg' || type === 'jpeg' || type === 'png') {
      // In a real app, this would be a URL to the actual file
      return (
        <div className="flex justify-center py-6">
          <img
            src={`https://placehold.co/800x600?text=${document.name}`}
            alt={document.name}
            className="max-w-full max-h-[60vh] object-contain rounded border"
          />
        </div>
      );
    }
    
    // For PDFs, show a PDF viewer (in a real app)
    if (type === 'pdf') {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 rounded border p-8">
          <div className="text-6xl mb-4">{getDocumentTypeIcon()}</div>
          <p className="text-center mb-4">Visualização de PDF</p>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Num ambiente de produção, aqui seria renderizado o visualizador de PDF com o documento real.
          </p>
        </div>
      );
    }
    
    // For other file types, show a generic preview
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 rounded border p-8">
        <div className="text-6xl mb-4">{getDocumentTypeIcon()}</div>
        <p className="text-center mb-4">Pré-visualização não disponível</p>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          Este tipo de ficheiro não pode ser pré-visualizado diretamente. Por favor, descarregue o ficheiro para o visualizar.
        </p>
      </div>
    );
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={document.name}
      className="max-w-4xl"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted p-4 rounded-lg">
          <div>
            <p className="text-sm font-medium">Detalhes do Documento</p>
            <div className="text-sm text-muted-foreground mt-1 space-y-1">
              <p>Tipo: {document.type.toUpperCase()}</p>
              <p>Tamanho: {document.size}</p>
              <p>Data de upload: {document.uploadDate}</p>
              <p>Processo: {document.processNumber || "N/A"}</p>
            </div>
          </div>
          <div className="flex gap-2 self-end sm:self-auto">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Partilhar
            </Button>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
            <Button variant="default" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Descarregar
            </Button>
          </div>
        </div>
        
        {getDocumentPreview()}
      </div>
    </Modal>
  );
};

export default DocumentPreviewModal;
