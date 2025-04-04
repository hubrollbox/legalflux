
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from "@/components/PageTransition";

// Componentes de integrações
import PDFViewer from "@/components/integrations/PDFViewer";
import CalendarIntegration from "@/components/integrations/CalendarIntegration";
import CloudIntegration from "@/components/integrations/CloudIntegration";
import MessagingIntegration from "@/components/integrations/MessagingIntegration";
import OfficeIntegration from "@/components/integrations/OfficeIntegration";

const Integrations = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="dashboard-header">
          <SectionHeader
            title="Integrações"
            description="Conecte o LegalFlux com outras aplicações e serviços"
          />
          <Button className="bg-highlight hover:bg-highlight/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Nova Integração
          </Button>
        </div>

        <Tabs defaultValue="pdf" className="mt-6">
          <TabsList className="bg-white border mb-4">
            <TabsTrigger value="pdf">Documentos PDF</TabsTrigger>
            <TabsTrigger value="office">Microsoft Office</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
            <TabsTrigger value="cloud">Armazenamento</TabsTrigger>
            <TabsTrigger value="messaging">Mensagens</TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="mt-0">
            <PDFViewer />
          </TabsContent>

          <TabsContent value="office" className="mt-0">
            <OfficeIntegration />
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            <CalendarIntegration />
          </TabsContent>

          <TabsContent value="cloud" className="mt-0">
            <CloudIntegration />
          </TabsContent>

          <TabsContent value="messaging" className="mt-0">
            <MessagingIntegration />
          </TabsContent>
        </Tabs>
      </PageTransition>
    </DashboardLayout>
  );
};

export default Integrations;
