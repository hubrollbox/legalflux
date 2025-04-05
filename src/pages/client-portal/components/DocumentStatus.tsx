
import React from 'react';
import { Badge } from '@/components/ui/badge';

type StatusType = 'approved' | 'pending' | 'rejected';

interface DocumentStatusProps {
  status: StatusType;
}

export const DocumentStatus: React.FC<DocumentStatusProps> = ({ status }) => {
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
