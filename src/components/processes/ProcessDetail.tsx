
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { Document } from "@/types/document";

const fixDateFormatting = (date: string | Date | undefined) => {
  if (!date) return "--";
  try {
    return format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "--";
  }
};

interface ProcessDetailProps {
  process: {
    id: string;
    title: string;
    number?: string;
    client?: string;
    status?: string;
    priority?: string;
    deadline?: string | Date;
    description?: string;
  };
  documents: Document[];
}

const ProcessDetail: React.FC<ProcessDetailProps> = ({ process, documents }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate('/processes');
  };

  const getStatusBadge = (status?: string) => {
    if (!status) return null;

    switch (status.toLowerCase()) {
      case 'active':
      case 'ativo':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'pending':
      case 'pendente':
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case 'closed':
      case 'encerrado':
        return <Badge className="bg-gray-500">Encerrado</Badge>;
      case 'urgent':
      case 'urgente':
        return <Badge className="bg-red-500">Urgente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;

    switch (priority.toLowerCase()) {
      case 'high':
      case 'alta':
        return <Badge variant="outline" className="border-red-500 text-red-500">Alta</Badge>;
      case 'medium':
      case 'média':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Média</Badge>;
      case 'low':
      case 'baixa':
        return <Badge variant="outline" className="border-green-500 text-green-500">Baixa</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  // Fix the formatDate call
  const formattedDate = fixDateFormatting(process.deadline);

  return (
    <Card className="space-y-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          {process.title}
        </CardTitle>
        <Button variant="ghost" onClick={handleGoBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Detalhes do Processo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Número:</p>
              <p>{process.number || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cliente:</p>
              <p>{process.client || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status:</p>
              <p>{getStatusBadge(process.status) || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Prioridade:</p>
              <p>{getPriorityBadge(process.priority) || 'N/A'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Prazo:</p>
              <p>{formattedDate || 'N/A'}</p>
            </div>
          </div>
        </div>

        {process.description && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Descrição</h3>
            <p>{process.description}</p>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Documentos</h3>
          {documents.length === 0 ? (
            <p>Nenhum documento associado a este processo.</p>
          ) : (
            <div>
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {doc.version && `v${doc.version} • `}
                      {doc.updatedAt && `Última atualização: ${fixDateFormatting(doc.updatedAt)}`}
                    </p>
                  </div>
                  <Button variant="ghost">
                    <FileText className="mr-2 h-4 w-4" />
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessDetail;
