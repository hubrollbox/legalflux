
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  processNumber?: string;
}

interface DocumentActionsProps {
  document: Document;
  onPreview: (document: Document) => void;
}

export const DocumentActions: React.FC<DocumentActionsProps> = ({ document, onPreview }) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => onPreview(document)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};
