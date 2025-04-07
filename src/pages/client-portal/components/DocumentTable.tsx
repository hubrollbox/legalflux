
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DocumentStatus } from './DocumentStatus';
import { DocumentActions } from './DocumentActions';

export interface Document {
  id: string;
  name: string;
  type: "document" | "action" | "precedent" | "strategy";
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
