
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Processes = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Processos"
          description="Gerencie todos os seus processos jurídicos"
        />
        <Button className="bg-highlight hover:bg-highlight/90">
          <Plus className="mr-2 h-4 w-4" /> Novo Processo
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Lista de Processos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Aqui serão listados todos os seus processos. Utilize o botão acima para criar um novo processo.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Processes;
