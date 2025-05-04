
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer, Share2 } from "lucide-react";
import CustomImage from "@/components/ui/CustomImage";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  processNumber?: string;
  fileUrl?: string;
  title?: string;
}

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: Document | null;
  processId?: string;
}

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  document
}) => {
  if (!document) return null;

  const getDocumentTypeIcon = () => {
    switch (document.type?.toLowerCase()) {
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
    if (!document) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 rounded border p-8">
          <div className="text-6xl mb-4">❌</div>
          <p className="text-center mb-4">Document not found</p>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            The requested document is not available.
          </p>
        </div>
      );
    }
    
    // Validate document type exists
    if (!document.type) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 rounded border p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-center mb-4">Invalid document type</p>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            This document has no type information and cannot be previewed.
          </p>
        </div>
      );
    }

    const type = document.type.toLowerCase();
    
    // For images, show the actual image
    if (type === 'jpg' || type === 'jpeg' || type === 'png') {
      return (
        <div className="flex justify-center py-6">
          <CustomImage
            src={document.fileUrl || `https://placehold.co/800x600?text=${document.name}`}
            alt={document.name}
            width={800}
            height={600}
            className="max-w-full max-h-[60vh] object-contain rounded border"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://placehold.co/800x600?text=Image+Not+Available`;
            }}
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
    
    // For supported office documents
    if (['docx', 'doc', 'xlsx', 'xls', 'pptx', 'ppt'].includes(type)) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 rounded border p-8">
          <div className="text-6xl mb-4">{getDocumentTypeIcon()}</div>
          <p className="text-center mb-4">Pré-visualização disponível</p>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Este tipo de documento pode ser visualizado após o download.
          </p>
        </div>
      );
    }
    
    // For unsupported file types
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 rounded border p-8">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-center mb-4">Unsupported file type</p>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          The {type.toUpperCase()} format cannot be previewed. Please download the file to view it.
        </p>
        <div className="mt-4 text-xs text-muted-foreground">
          Supported formats: PDF, DOCX, XLSX, PPTX, JPG, PNG
        </div>
      </div>
    );
  };

  return (
    <dialog open={isOpen} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-medium">{document.name}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            X
          </Button>
        </div>
        
        <div className="space-y-6 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted p-4 rounded-lg">
            <div>
              <p className="text-sm font-medium">Detalhes do Documento</p>
              <div className="text-sm text-muted-foreground mt-1 space-y-1">
                <p>Tipo: {document.type?.toUpperCase() || 'N/A'}</p>
                <p>Tamanho: {document.size || 'N/A'}</p>
                <p>Data de upload: {document.uploadDate || 'N/A'}</p>
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
      </div>
    </dialog>
  );
};

export default DocumentPreviewModal;
