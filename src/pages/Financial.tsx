
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Financial = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Financeiro"
          description="Gerencie as finanças do seu escritório"
        />
        <Button className="bg-highlight hover:bg-highlight/90">
          <Plus className="mr-2 h-4 w-4" /> Nova Transação
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Resumo Financeiro</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Aqui será exibido o resumo financeiro do seu escritório. Utilize o botão acima para registar uma nova transação.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Financial;
