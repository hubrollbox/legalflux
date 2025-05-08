import React from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import type { Process } from '@/types/process';
import type { Document } from '@/types/document';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, Calendar, Edit, ArrowLeft, Download } from 'lucide-react';

interface ProcessDetailProps {
  process: Process & {
    documents?: Document[];
  };
  onBack: () => void;
  onEdit: (id: string) => void;
  onExportPdf: (id: string) => void;
}

const getStatusColor = (status: string) => {
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

const getStatusName = (status: string) => {
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

const getProcessTypeName = (type: string) => {
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

const ProcessDetail: React.FC<ProcessDetailProps> = ({ 
  process, 
  onBack, 
  onEdit,
  onExportPdf
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onExportPdf(process.id)}>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button onClick={() => onEdit(process.id)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{process.title}</CardTitle>
              <CardDescription>Processo nº {process.number}</CardDescription>
            </div>
            <Badge className={getStatusColor(process.status)}>
              {getStatusName(process.status)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="timeline">Linha do Tempo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Cliente:</span>
                    <span className="ml-2">{process.clientId || "--"}</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Tipo:</span>
                    <span className="ml-2">{getProcessTypeName(process.type)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Data de Início:</span>
                    <span className="ml-2">
                      {process.startDate ? format(new Date(process.startDate), 'PPP', { locale: pt }) : '--'}
                    </span>
                  </div>
                  {process.endDate && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Data de Encerramento:</span>
                      <span className="ml-2">
                        {process.endDate ? format(new Date(process.endDate), 'PPP', { locale: pt }) : '--'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Descrição</h3>
                <p className="text-muted-foreground">
                  {process.description || "Nenhuma descrição disponível."}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="pt-4">
              {process.documents && process.documents.length > 0 ? (
                <div className="space-y-4">
                  {process.documents.map((doc) => (
                    <Card key={doc.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-blue-600" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Versão {doc.version} • Atualizado em {format(new Date(doc.updatedAt), 'PPP', { locale: pt })}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-20" />
                  <p>Nenhum documento associado a este processo.</p>
                  <Button variant="outline" className="mt-4">
                    Adicionar Documento
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="timeline" className="pt-4">
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div className="pb-8">
                    <p className="font-medium">Processo criado</p>
                    <p className="text-sm text-muted-foreground">
                      {process.createdAt ? format(new Date(process.createdAt), 'PPP', { locale: pt }) : '--'}
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="h-4 w-4 rounded-full bg-blue-600"></div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div className="pb-8">
                    <p className="font-medium">Processo iniciado</p>
                    <p className="text-sm text-muted-foreground">
                      {process.startDate ? format(new Date(process.startDate), "dd 'de' MMMM 'de' yyyy", { locale: pt }) : '--'}
                    </p>
                  </div>
                </div>
                
                {process.endDate && (
                  <div className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="h-4 w-4 rounded-full bg-green-600"></div>
                    </div>
                    <div>
                      <p className="font-medium">Processo finalizado</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(process.endDate), 'PPP', { locale: pt })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessDetail;
