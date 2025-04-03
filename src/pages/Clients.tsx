
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Clients = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Clientes"
          description="Gerencie a sua carteira de clientes"
        />
        <Button className="bg-highlight hover:bg-highlight/90">
          <UserPlus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Aqui serão listados todos os seus clientes. Utilize o botão acima para adicionar um novo cliente.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Clients;
