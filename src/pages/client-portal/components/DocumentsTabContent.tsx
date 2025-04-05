
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DocumentTable, Document } from './DocumentTable';

interface DocumentsTabContentProps {
  title: string;
  documents: Document[];
  onPreviewDocument: (document: Document) => void;
  statusFilter?: 'pending' | 'approved' | 'all';
}

export const DocumentsTabContent: React.FC<DocumentsTabContentProps> = ({
  title,
  documents,
  onPreviewDocument,
  statusFilter = 'all'
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <DocumentTable 
          documents={documents} 
          onPreviewDocument={onPreviewDocument} 
          statusFilter={statusFilter}
        />
      </CardContent>
    </Card>
  );
};
