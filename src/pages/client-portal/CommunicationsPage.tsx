import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Message = {
  id: string;
  sender: string;
  senderAvatar?: string;
  senderInitials: string;
  content: string;
  timestamp: string;
  isFromUser: boolean;
};

const CommunicationsPage = () => {
  const [messages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Dr. João Silva',
      senderInitials: 'JS',
      content: 'Bom dia! Informo que a audiência do seu processo foi agendada para o dia 15/12/2023 às 14h30.',
      timestamp: '2023-11-20T09:30:00',
      isFromUser: false,
    },
    {
      id: '2',
      sender: 'Você',
      senderInitials: 'VC',
      content: 'Obrigado pela informação. Estarei presente. Preciso levar algum documento específico?',
      timestamp: '2023-11-20T10:15:00',
      isFromUser: true,
    },
    {
      id: '3',
      sender: 'Dr. João Silva',
      senderInitials: 'JS',
      content: 'Sim, por favor traga seu documento de identificação e os comprovantes de pagamento que discutimos anteriormente.',
      timestamp: '2023-11-20T10:45:00',
      isFromUser: false,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica para enviar a mensagem
    setNewMessage('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Comunicação</h1>
        <p className="text-muted-foreground">
          Comunique-se diretamente com sua equipe jurídica de forma segura e eficiente.
        </p>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 h-[400px] overflow-y-auto p-4 border rounded-md mb-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`flex max-w-[70%] ${message.isFromUser ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <Avatar className="h-8 w-8 mr-2">
                        {message.senderAvatar && <AvatarImage src={message.senderAvatar} />}
                        <AvatarFallback>{message.senderInitials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div 
                          className={`rounded-lg px-4 py-2 ${message.isFromUser ? 'bg-primary text-primary-foreground ml-2' : 'bg-muted'}`}
                        >
                          <p className="text-sm font-medium">{message.sender}</p>
                          <p>{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(message.timestamp).toLocaleString('pt-PT')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input 
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">Enviar</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notificações do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium">Documento Adicionado</h3>
                  <p className="text-sm text-muted-foreground">Um novo documento foi adicionado ao seu processo #2023/12345.</p>
                  <p className="text-xs text-muted-foreground">Hoje, 10:30</p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium">Prazo se Aproximando</h3>
                  <p className="text-sm text-muted-foreground">Lembrete: Você tem um prazo em 5 dias para o processo #2023/67890.</p>
                  <p className="text-xs text-muted-foreground">Ontem, 15:45</p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium">Audiência Agendada</h3>
                  <p className="text-sm text-muted-foreground">Uma audiência foi agendada para 15/12/2023 às 14:30.</p>
                  <p className="text-xs text-muted-foreground">20/11/2023, 09:15</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationsPage;