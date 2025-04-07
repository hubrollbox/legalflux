import React from 'react';
import { FileText, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardWidget from './DashboardWidget';

interface Document {
  id: string;
  name: string;
  type: string;
  updatedAt: string;
  status: 'draft' | 'review' | 'final' | 'archived';
}

interface RecentDocumentsWidgetProps {
  documents: Document[];
  className?: string;
  onViewAll?: () => void;
}

const RecentDocumentsWidget: React.FC<RecentDocumentsWidgetProps> = ({
  documents,
  className = '',
  onViewAll,
}) => {
  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'final': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Document['status']) => {
    switch (status) {
      case 'draft': return 'Rascunho';
      case 'review': return 'Em Revisão';
      case 'final': return 'Final';
      case 'archived': return 'Arquivado';
      default: return status;
    }
  };

  return (
    <DashboardWidget 
      title="Documentos Recentes" 
      description="Últimos documentos atualizados"
      className={className}
      collapsible
    >
      <div className="space-y-4">
        {documents.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            <FileText className="mx-auto h-8 w-8 mb-2 opacity-50" />
            <p>Nenhum documento recente</p>
          </div>
        ) : (
          <div className="space-y-3">
            {documents.slice(0, 5).map((doc) => (
              <div key={doc.id} className="flex items-start justify-between p-2 rounded-md hover:bg-gray-50">
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{doc.name}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{doc.updatedAt}</span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(doc.status)}>
                  {getStatusText(doc.status)}
                </Badge>
              </div>
            ))}
          </div>
        )}
        
        {documents.length > 0 && onViewAll && (
          <div className="pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={onViewAll}
            >
              Ver todos os documentos
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </div>
        )}
      </div>
    </DashboardWidget>
  );
};

export default RecentDocumentsWidget;