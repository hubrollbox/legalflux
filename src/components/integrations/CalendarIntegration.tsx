
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CalendarIntegration = () => {
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
          <CardTitle>Integração de Calendário</CardTitle>
          <CardDescription>Sincronize seus eventos e prazos com seu calendário preferido</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <img 
                    src="/img/integrations/google-calendar.svg" 
                    alt="Google Calendar" 
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=G";
                    }}
                  />
                  <span>Google Calendar</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("Google Calendar")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Conectar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <img 
                    src="/img/integrations/outlook.svg" 
                    alt="Microsoft Outlook" 
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=O";
                    }}
                  />
                  <span>Microsoft Outlook</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("Microsoft Outlook")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Conectar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <img 
                    src="/img/integrations/apple-calendar.svg" 
                    alt="Apple Calendar" 
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=A";
                    }}
                  />
                  <span>Apple Calendar</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("Apple Calendar")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Conectar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de Sincronização</CardTitle>
          <CardDescription>Personalize como os seus eventos são sincronizados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Sincronizar prazos processuais</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Sincronizar audiências</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Sincronizar reuniões com clientes</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span>Sincronizar eventos internos</span>
              </label>
              
              <div className="mt-4">
                <Button className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Atualizar Sincronização
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarIntegration;
