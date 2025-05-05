
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudIcon, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CustomImage from "@/components/ui/CustomImage";

const CloudIntegration = () => {
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
          <CardTitle>Armazenamento na Nuvem</CardTitle>
          <CardDescription>Conecte suas contas de armazenamento na nuvem para acesso a ficheiros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <CustomImage 
                    src="/img/integrations/google-drive.svg" 
                    alt="Google Drive" 
                    width={24}
                    height={24}
                    className="mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=GD";
                    }}
                  />
                  <span>Google Drive</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("Google Drive")}
                >
                  <CloudIcon className="mr-2 h-4 w-4" />
                  Conectar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <CustomImage 
                    src="/img/integrations/onedrive.svg" 
                    alt="Microsoft OneDrive" 
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=OD";
                    }}
                  />
                  <span>Microsoft OneDrive</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("Microsoft OneDrive")}
                >
                  <CloudIcon className="mr-2 h-4 w-4" />
                  Conectar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <CustomImage 
                    src="/img/integrations/dropbox.svg" 
                    alt="Dropbox" 
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=DB";
                    }}
                  />
                  <span>Dropbox</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("Dropbox")}
                >
                  <CloudIcon className="mr-2 h-4 w-4" />
                  Conectar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ficheiros Recentes</CardTitle>
          <CardDescription>Últimos documentos acedidos através das integrações na nuvem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Conecte uma conta de armazenamento na nuvem para ver os seus ficheiros recentes aqui.
            </p>
            
            <div className="p-8 flex flex-col items-center justify-center border border-dashed rounded-md">
              <CloudIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-center text-muted-foreground">
                Nenhuma integração de armazenamento ativa.
                <br />
                Conecte uma conta para aceder aos seus ficheiros.
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

export default CloudIntegration;
