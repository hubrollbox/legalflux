
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Messages = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Mensagens"
          description="Gerencie as suas comunicações com clientes e colegas"
        />
        <Button className="bg-highlight hover:bg-highlight/90">
          <PenSquare className="mr-2 h-4 w-4" /> Nova Mensagem
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Conversas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Aqui serão listadas as suas conversas. Utilize o botão acima para iniciar uma nova conversa.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Messages;
