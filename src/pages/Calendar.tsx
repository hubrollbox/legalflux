import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Calendar from "react-calendar"; // Importando a biblioteca de calendário
import "react-calendar/dist/Calendar.css"; // Estilos do calendário

const CalendarPage = () => {
  const [date, setDate] = useState(new Date()); // Estado para gerenciar a data selecionada

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
          {/* Substituindo o texto estático pelo componente de calendário */}
          <Calendar
            onChange={(value) => setDate(value instanceof Date ? value : value[0])}
            value={date}
            className="react-calendar"
          />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default CalendarPage;
