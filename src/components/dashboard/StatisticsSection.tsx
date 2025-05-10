
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticsProps } from '@/types/dashboard';

const StatisticsSection: React.FC<StatisticsProps> = ({ 
  activeProcesses,
  pendingDocuments, 
  completedCases,
  averageResolutionTime,
  userOrganization
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Estatísticas do Escritório - {userOrganization}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Processos Ativos</CardDescription>
            <CardTitle className="text-3xl">{activeProcesses}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Processos em andamento
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Documentos Pendentes</CardDescription>
            <CardTitle className="text-3xl">{pendingDocuments}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Aguardando revisão
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Casos Concluídos</CardDescription>
            <CardTitle className="text-3xl">{completedCases}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Nos últimos 30 dias
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tempo Médio de Resolução</CardDescription>
            <CardTitle className="text-3xl">{averageResolutionTime} dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Baseado nos últimos casos
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsSection;
