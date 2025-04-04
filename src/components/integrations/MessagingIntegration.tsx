
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Link2, PhoneForwarded } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const MessagingIntegration = () => {
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
          <CardTitle>Integrações de Mensagens</CardTitle>
          <CardDescription>Conecte suas plataformas de mensagens para comunicação com clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <img 
                    src="/img/integrations/whatsapp.svg" 
                    alt="WhatsApp" 
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=W";
                    }}
                  />
                  <span>WhatsApp Business</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("WhatsApp Business")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Conectar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <img 
                    src="/img/integrations/telegram.svg" 
                    alt="Telegram" 
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=T";
                    }}
                  />
                  <span>Telegram</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("Telegram")}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Conectar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center">
                  <img 
                    src="/img/integrations/sms.svg" 
                    alt="SMS" 
                    className="w-6 h-6 mr-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/24x24?text=SMS";
                    }}
                  />
                  <span>SMS API</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleConnect("SMS API")}
                >
                  <PhoneForwarded className="mr-2 h-4 w-4" />
                  Configurar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de Mensagens</CardTitle>
          <CardDescription>Personalize suas notificações e integrações de mensagens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notif-updates">Atualizações de Processo</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar notificações quando houver atualizações em processos
                </p>
              </div>
              <Switch id="notif-updates" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notif-deadlines">Prazos Próximos</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar lembretes para prazos processuais próximos
                </p>
              </div>
              <Switch id="notif-deadlines" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notif-meetings">Lembretes de Reuniões</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar lembretes de reuniões agendadas com clientes
                </p>
              </div>
              <Switch id="notif-meetings" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notif-docs">Novos Documentos</Label>
                <p className="text-sm text-muted-foreground">
                  Notificar quando novos documentos forem adicionados
                </p>
              </div>
              <Switch id="notif-docs" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagingIntegration;
