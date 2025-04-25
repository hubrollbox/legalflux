
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Link2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

const OfficeIntegration = () => {
  const { toast } = useToast();

  const handleConnect = (service: string) => {
    toast({
      title: "Integração iniciada",
      description: `A conectar ao ${service}...`,
    });
    // Simulação de uma conexão bem-sucedida após 2 segundos
    setTimeout(() => {
      toast({
        title: "Conectado com sucesso",
        description: `O LegalFlux está agora integrado com o ${service}.`,
      });
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Microsoft Office 365</CardTitle>
          <CardDescription>Integre seus documentos do Office para edição e colaboração</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <img 
                    src="/img/integrations/word.svg" 
                    alt="Microsoft Word" 
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=W";
                    }}
                  />
                  <span>Word</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("Microsoft Word")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Conectar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <img 
                    src="/img/integrations/excel.svg" 
                    alt="Microsoft Excel" 
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=E";
                    }}
                  />
                  <span>Excel</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("Microsoft Excel")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Conectar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <img 
                    src="/img/integrations/powerpoint.svg" 
                    alt="Microsoft PowerPoint" 
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=P";
                    }}
                  />
                  <span>PowerPoint</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("Microsoft PowerPoint")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Conectar
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <img 
                    src="/img/integrations/office365.svg" 
                    alt="Microsoft Office 365" 
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=O365";
                    }}
                  />
                  <span>Office 365 (Completo)</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("Microsoft Office 365")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Configurar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Modelos de Documentos</CardTitle>
          <CardDescription>Acesse e edite modelos de documentos jurídicos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Conecte o Microsoft Office para criar, editar e gerenciar seus modelos de documentos jurídicos diretamente na plataforma.
            </p>
            
            <div className="p-8 flex flex-col items-center justify-center border border-dashed rounded-md">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-center text-muted-foreground">
                Nenhuma integração com o Office ativa.
                <br />
                Conecte para aceder aos seus modelos de documentos.
              </p>
              <Button className="mt-4">
                <Link2 className="mr-2 h-4 w-4" />
                Configurar Integração
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficeIntegration;

// Replace each img tag like this:
<Image
  src="/icons/outlook.svg"
  alt="Outlook Integration"
  width={40}
  height={40}
  className="h-10 w-10"
/>
<Image
  src="/office-integration.png"
  alt="Office Integration"
  width={500}
  height={300}
  className="integration-image"
/>
