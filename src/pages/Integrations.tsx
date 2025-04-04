
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import SectionHeader from "@/components/layout/SectionHeader";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTransition from "@/components/PageTransition";
import LandingNavbar from "@/pages/landing/components/LandingNavbar";
import LandingFooter from "@/pages/landing/components/LandingFooter";

// Componentes de integrações
import PDFViewer from "@/components/integrations/PDFViewer";
import CalendarIntegration from "@/components/integrations/CalendarIntegration";
import CloudIntegration from "@/components/integrations/CloudIntegration";
import MessagingIntegration from "@/components/integrations/MessagingIntegration";
import OfficeIntegration from "@/components/integrations/OfficeIntegration";

const Integrations = () => {
  const { isAuthenticated, user } = useAuth();

  // Componente para exibir quando o usuário estiver autenticado
  const AuthenticatedView = () => (
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

  // Componente para exibir quando o usuário não estiver autenticado
  const UnauthenticatedView = () => (
    <PageTransition>
      <LandingNavbar />
      <div className="pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Integrações</h1>
            <p className="text-lg text-gray-600">
              Conecte o LegalFlux com outras aplicações e serviços para otimizar o seu fluxo de trabalho jurídico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Documentos PDF</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Visualize, edite e assine documentos PDF diretamente na plataforma.</p>
                <Button variant="outline" className="w-full">Saiba mais</Button>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Microsoft Office</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Integração completa com Word, Excel e Outlook para maior produtividade.</p>
                <Button variant="outline" className="w-full">Saiba mais</Button>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Calendário</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Sincronize com Google Calendar e outros serviços para gerir os seus compromissos.</p>
                <Button variant="outline" className="w-full">Saiba mais</Button>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Armazenamento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Conecte com Google Drive, Dropbox e OneDrive para acesso fácil aos seus ficheiros.</p>
                <Button variant="outline" className="w-full">Saiba mais</Button>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Mensagens</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Integração com WhatsApp, Telegram e outros serviços de mensagens para comunicação com clientes.</p>
                <Button variant="outline" className="w-full">Saiba mais</Button>
              </CardContent>
            </Card>

            <Card className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Personalizado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Desenvolvemos integrações personalizadas para atender às necessidades específicas do seu escritório.</p>
                <Button variant="outline" className="w-full">Saiba mais</Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16 py-10 px-6 bg-primary text-white rounded-xl max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Pronto para otimizar o seu fluxo de trabalho?
            </h2>
            <p className="mb-6">
              Registe-se hoje e comece a utilizar todas as integrações disponíveis no LegalFlux.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => window.location.href = "/register"}
            >
              Começar agora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <LandingFooter />
    </PageTransition>
  );

  // Renderiza o componente apropriado com base no estado de autenticação
  return isAuthenticated ? <AuthenticatedView /> : <UnauthenticatedView />;
};

export default Integrations;
