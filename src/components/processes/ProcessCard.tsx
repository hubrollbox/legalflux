
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Process, ProcessStatus, ProcessType } from "@/types/process";
import { Eye, FileText, Calendar } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface ProcessCardProps {
  process: Process;
  onView: (id: string) => void;
}

const getStatusColor = (status: ProcessStatus) => {
  switch (status) {
    case "in_progress":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "new":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "archived":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const getStatusName = (status: ProcessStatus) => {
  switch (status) {
    case "in_progress":
      return "Em Curso";
    case "new":
      return "Novo";
    case "completed":
      return "Finalizado";
    case "archived":
      return "Arquivado";
    default:
      return status;
  }
};

const getProcessTypeName = (type: ProcessType) => {
  switch (type) {
    case "civil":
      return "Civil";
    case "criminal":
      return "Criminal";
    case "administrative":
      return "Administrativo";
    case "labor":
      return "Trabalhista";
    case "tax":
      return "Fiscal";
    case "other":
      return "Outro";
    default:
      return type;
  }
};

const ProcessCard: React.FC<ProcessCardProps> = ({ process, onView }) => {
  // Função auxiliar segura para formatação de data
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Data não especificada";
    try {
      return format(new Date(dateString), 'PPP');
    } catch (error) {
      console.error("Erro ao formatar data:", error);
      return "Data inválida";
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold truncate">{process.title}</h3>
          <Badge className={getStatusColor(process.status)}>
            {getStatusName(process.status)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Processo nº {process.number}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{getProcessTypeName(process.type)}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{formatDate(process.startDate)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full" onClick={() => onView(process.id)}>
          <Eye className="h-4 w-4 mr-2" />
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProcessCard;
