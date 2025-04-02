
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeader } from "@/components/layout/SectionHeader";

const Screenshots = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-12 px-4">
      <SectionHeader
        title="Screenshots e Suporte"
        description="Conheça a plataforma LegalFlux e encontre o suporte técnico necessário"
      />

      <Tabs defaultValue="screenshots" className="mt-8">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="screenshots">Capturas de Ecrã</TabsTrigger>
          <TabsTrigger value="support">Suporte Técnico</TabsTrigger>
        </TabsList>
        
        <TabsContent value="screenshots" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Imagens da plataforma */}
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Dashboard da Plataforma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Dashboard Principal</CardTitle>
                <CardDescription>Visão geral da plataforma com todas as informações relevantes.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Gestão de Processos" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Gestão de Processos</CardTitle>
                <CardDescription>Interface intuitiva para gestão de todos os processos jurídicos.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Documentos" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Gestão Documental</CardTitle>
                <CardDescription>Sistema completo para organização e controlo de documentos.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Calendário" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Agenda e Prazos</CardTitle>
                <CardDescription>Calendário interativo para gestão de prazos processuais.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Utilizadores" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Gestão de Utilizadores</CardTitle>
                <CardDescription>Controlo granular de permissões e perfis de acesso.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-100 relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Financeiro" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Gestão Financeira</CardTitle>
                <CardDescription>Controlo completo das finanças do escritório.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button onClick={() => navigate("/register")} size="lg">
              Experimente Gratuitamente
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="support" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Perguntas Frequentes</CardTitle>
                  <CardDescription>
                    Respostas para as dúvidas mais comuns sobre a plataforma LegalFlux
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Como posso iniciar o meu período experimental?</h3>
                    <p className="text-muted-foreground">
                      Basta registar-se na plataforma. Terá acesso gratuito por 14 dias a todas as funcionalidades do plano Enterprise.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Posso migrar os meus dados de outro sistema?</h3>
                    <p className="text-muted-foreground">
                      Sim, oferecemos serviços de migração de dados para sistemas legados. Entre em contacto com o nosso suporte para mais informações.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Como funcionam as permissões de utilizadores?</h3>
                    <p className="text-muted-foreground">
                      O LegalFlux utiliza um sistema de controlo baseado em funções (RBAC), que permite definir exatamente o que cada utilizador pode ver e fazer.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Os meus dados estão seguros?</h3>
                    <p className="text-muted-foreground">
                      Sim, utilizamos encriptação de ponta a ponta e estamos em conformidade com o RGPD. Todos os dados são armazenados com redundância geográfica.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Posso cancelar a minha assinatura a qualquer momento?</h3>
                    <p className="text-muted-foreground">
                      Sim, as assinaturas podem ser canceladas a qualquer momento, sem penalizações. Os dados ficarão disponíveis para exportação por 30 dias após o cancelamento.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Contacte-nos</CardTitle>
                  <CardDescription>
                    Estamos disponíveis para ajudar em todas as suas questões
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <div>
                      <h4 className="font-medium">Telefone</h4>
                      <p className="text-muted-foreground">+351 210 123 456</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-muted-foreground">suporte@legalflux.pt</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-1"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>
                    <div>
                      <h4 className="font-medium">Morada</h4>
                      <p className="text-muted-foreground">
                        Av. da Liberdade, 110<br />
                        1269-046 Lisboa<br />
                        Portugal
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full">
                      Solicitar Contacto
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Screenshots;
