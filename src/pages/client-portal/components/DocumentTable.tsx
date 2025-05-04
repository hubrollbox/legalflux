
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Eye, Share2 } from 'lucide-react';

export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  processNumber?: string;
}

interface DocumentTableProps {
  documents: Document[];
  onPreviewDocument: (document: Document) => void;
  statusFilter?: 'pending' | 'approved' | 'all';
}

export const DocumentStatus = ({ status }: { status: string }) => {
  switch(status) {
    case 'approved':
      return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Aprovado</span>;
    case 'rejected':
      return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">Rejeitado</span>;
    case 'pending':
    default:
      return <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">Pendente</span>;
  }
};

export const DocumentActions = ({ 
  document, 
  onPreview 
}: { 
  document: Document, 
  onPreview: (doc: Document) => void 
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onPreview(document)}
        title="Visualizar documento"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        title="Descarregar documento"
      >
        <Download className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        title="Partilhar documento"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export const DocumentTable: React.FC<DocumentTableProps> = ({ 
  documents, 
  onPreviewDocument,
  statusFilter = 'all'
}) => {
  const filteredDocuments = statusFilter === 'all' 
    ? documents 
    : documents.filter(doc => doc.status === statusFilter);

  return (
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
        {filteredDocuments.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell className="font-medium">{doc.name}</TableCell>
            <TableCell>{doc.processNumber}</TableCell>
            <TableCell>{doc.type}</TableCell>
            <TableCell>{doc.size}</TableCell>
            <TableCell>{new Date(doc.uploadDate).toLocaleDateString('pt-PT')}</TableCell>
            <TableCell><DocumentStatus status={doc.status} /></TableCell>
            <TableCell>
              <DocumentActions document={doc} onPreview={onPreviewDocument} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DocumentTable;
