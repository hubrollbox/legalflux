
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Tasks = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Tarefas"
          description="Gerencie e acompanhe todas as suas tarefas"
        />
        <Button className="bg-highlight hover:bg-highlight/90">
          <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Lista de Tarefas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Aqui serão listadas todas as suas tarefas. Utilize o botão acima para criar uma nova tarefa.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Tasks;
