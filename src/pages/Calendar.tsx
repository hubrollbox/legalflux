
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CalendarPage = () => {
  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <SectionHeader
          title="Agenda"
          description="Gerencie os seus compromissos e prazos"
        />
        <Button className="bg-highlight hover:bg-highlight/90">
          <Plus className="mr-2 h-4 w-4" /> Novo Evento
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Calendário</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Aqui será exibido o seu calendário. Utilize o botão acima para adicionar um novo evento.
          </p>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CalendarPage;
