
import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, Upload, File, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUploader } from './components/FileUploader';
import { toast } from 'sonner';
import DocumentPreviewModal from './components/DocumentPreviewModal';

type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  processNumber?: string;
};

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Aprovado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">Rejeitado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Documentos</h1>
        <p className="text-muted-foreground">
          Gerencie todos os documentos relacionados aos seus processos jurídicos.
        </p>
      </div>

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
          <Card>
            <CardHeader>
              <CardTitle>Todos os Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Processo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Data de Upload</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.processNumber}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{new Date(doc.uploadDate).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handlePreviewDocument(doc)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Processo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Data de Upload</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.filter(doc => doc.status === 'pending').map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.processNumber}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{new Date(doc.uploadDate).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handlePreviewDocument(doc)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Aprovados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Processo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Tamanho</TableHead>
                    <TableHead>Data de Upload</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.filter(doc => doc.status === 'approved').map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.processNumber}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{new Date(doc.uploadDate).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            onClick={() => handlePreviewDocument(doc)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
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
