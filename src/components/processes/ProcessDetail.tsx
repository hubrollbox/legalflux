
import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/formatters";
import { Document } from "@/types/document";

interface ProcessDetailProps {
  process: {
    id: string;
    title: string;
    clientName: string;
    type: string;
    status: string;
    priority: string;
    progress: number;
    deadline: string;
    responsible: string;
    description: string;
    createdAt: string;
  };
  documents: Document[];
}

const ProcessDetail: React.FC<ProcessDetailProps> = ({ process, documents }) => {
  const navigate = useNavigate();
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "ativo":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Ativo
          </Badge>
        );
      case "pending":
      case "pendente":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Pendente
          </Badge>
        );
      case "completed":
      case "concluído":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Concluído
          </Badge>
        );
      case "cancelled":
      case "cancelado":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Cancelado
          </Badge>
        );
      default:
        return (
          <Badge>
            {status}
          </Badge>
        );
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
      case "alta":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Alta Prioridade
          </Badge>
        );
      case "medium":
      case "média":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Prioridade Média
          </Badge>
        );
      case "low":
      case "baixa":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Baixa Prioridade
          </Badge>
        );
      default:
        return (
          <Badge>
            {priority}
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">
          {process.title}
        </CardTitle>
        <Button variant="outline" size="sm" onClick={() => navigate("/processes")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Cliente
              </h3>
              <p>{process.clientName}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Tipo
              </h3>
              <p>{process.type}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Status
              </h3>
              {getStatusBadge(process.status)}
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Prioridade
              </h3>
              {getPriorityBadge(process.priority)}
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Prazo
              </h3>
              <p>{process.deadline}</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Descrição
            </h3>
            <p className="text-sm">{process.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mt-4 mb-2">Documentos</h3>
            <div className="space-y-2">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.version ? `v${doc.version}` : 'v1'} • 
                          Atualizado {formatDate(doc.updatedAt)}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Visualizar
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">Nenhum documento associado a este processo.</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessDetail;
