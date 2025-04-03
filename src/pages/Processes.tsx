import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Processes = () => {
  const processos = []; // Substituir por dados reais ou estado gerenciado
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Processos"
          description="Gerencie todos os seus processos jurídicos"
        />
        <Button
          className="bg-highlight hover:bg-highlight/90"
          aria-label="Criar novo processo"
        >
          <Plus className="mr-2 h-4 w-4" /> Novo Processo
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Lista de Processos</CardTitle>
        </CardHeader>
        <CardContent>
          {processos.length === 0 ? (
            <p>
              Nenhum processo encontrado. Utilize o botão acima para criar um novo processo.
            </p>
          ) : (
            <p>Aqui serão listados todos os seus processos.</p>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Processes;
