
import { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { FileUploader } from './components/FileUploader';
import DocumentPreviewModal from './components/DocumentPreviewModal';
import { DocumentsHeader } from './components/DocumentsHeader';
import { DocumentsTabContent } from './components/DocumentsTabContent';
import { Document } from './components/DocumentTable';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Contrato de Prestação de Serviços.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2023-11-10',
      status: 'approved',
      processNumber: '2023/12345'
    },
    {
      id: '2',
      name: 'Procuração.pdf',
      type: 'PDF',
      size: '1.1 MB',
      uploadDate: '2023-11-05',
      status: 'approved',
      processNumber: '2023/12345'
    },
    {
      id: '3',
      name: 'Comprovante de Pagamento.pdf',
      type: 'PDF',
      size: '0.8 MB',
      uploadDate: '2023-11-15',
      status: 'pending',
      processNumber: '2023/67890'
    },
    {
      id: '4',
      name: 'Declaração de Rendimentos.xlsx',
      type: 'XLSX',
      size: '1.5 MB',
      uploadDate: '2023-10-28',
      status: 'approved',
      processNumber: '2023/67890'
    },
  ]);
  
  const [uploading, setUploading] = useState<boolean>(false);
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

  const handleFileUpload = useCallback((files: File[]) => {
    setUploading(true);
    
    setTimeout(() => {
      const newDocuments = files.map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toLocaleDateString('pt-PT'),
        status: 'pending' as const,
        processNumber: '2023/NOVO'
      }));
      
      setDocuments(prev => [...newDocuments, ...prev]);
      setUploading(false);
      
      toast.success('Documentos carregados com sucesso', {
        description: `${files.length} documento(s) carregado(s) e aguardando aprovação.`
      });
    }, 1500);
  }, []);

  const handlePreviewDocument = (document: Document) => {
    setPreviewDocument(document);
    setIsPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setIsPreviewModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <DocumentsHeader />

      <FileUploader onFilesUploaded={handleFileUpload} disabled={uploading} />

      {uploading && (
        <div className="flex items-center justify-center p-4 bg-muted rounded-md">
          <Loader2 className="h-5 w-5 mr-2 animate-spin text-primary" />
          <span>A carregar documentos...</span>
        </div>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="approved">Aprovados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <DocumentsTabContent 
            title="Todos os Documentos" 
            documents={documents}
            onPreviewDocument={handlePreviewDocument}
            statusFilter="all"
          />
        </TabsContent>
        
        <TabsContent value="pending">
          <DocumentsTabContent 
            title="Documentos Pendentes" 
            documents={documents}
            onPreviewDocument={handlePreviewDocument}
            statusFilter="pending"
          />
        </TabsContent>
        
        <TabsContent value="approved">
          <DocumentsTabContent 
            title="Documentos Aprovados" 
            documents={documents}
            onPreviewDocument={handlePreviewDocument}
            statusFilter="approved"
          />
        </TabsContent>
      </Tabs>

      <DocumentPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={closePreviewModal}
        document={previewDocument}
      />
    </div>
  );
};

export default DocumentsPage;
