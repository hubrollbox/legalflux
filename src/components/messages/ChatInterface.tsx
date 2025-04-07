import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Phone, Video, MoreVertical, Paperclip, Search, Clock, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastMessage?: string;
  unreadCount?: number;
  lastActive?: Date;
}

// Dados de exemplo
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Ana Silva',
    avatar: '/public/img/avatar1.jpg',
    status: 'online',
    lastMessage: 'Preciso dos documentos para o processo',
    unreadCount: 3,
    lastActive: new Date()
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    avatar: '/public/img/avatar2.jpg',
    status: 'offline',
    lastMessage: 'Obrigado pela informação',
    lastActive: new Date(Date.now() - 3600000)
  },
  {
    id: '3',
    name: 'Sofia Rodrigues',
    avatar: '/public/img/avatar3.jpg',
    status: 'away',
    lastMessage: 'Vamos agendar uma reunião?',
    unreadCount: 1,
    lastActive: new Date(Date.now() - 1800000)
  },
  {
    id: '4',
    name: 'Miguel Costa',
    avatar: '/public/img/avatar4.jpg',
    status: 'online',
    lastMessage: 'Documentos enviados conforme solicitado',
    lastActive: new Date()
  },
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      content: 'Olá, preciso dos documentos para o processo',
      sender: 'contact',
      timestamp: new Date(Date.now() - 3600000 * 2),
      status: 'read'
    },
    {
      id: '102',
      content: 'Quais documentos específicos você precisa?',
      sender: 'user',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
    {
      id: '103',
      content: 'Preciso da procuração e dos comprovantes de pagamento',
      sender: 'contact',
      timestamp: new Date(Date.now() - 1800000),
      status: 'read'
    },
    {
      id: '104',
      content: 'Também preciso do contrato assinado',
      sender: 'contact',
      timestamp: new Date(Date.now() - 1700000),
      status: 'read'
    },
    {
      id: '105',
      content: 'Vou providenciar isso hoje ainda',
      sender: 'user',
      timestamp: new Date(Date.now() - 1600000),
      status: 'delivered'
    },
  ],
  '2': [
    {
      id: '201',
      content: 'Enviei os documentos solicitados',
      sender: 'user',
      timestamp: new Date(Date.now() - 86400000),
      status: 'read'
    },
    {
      id: '202',
      content: 'Obrigado pela informação',
      sender: 'contact',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
  ],
  '3': [
    {
      id: '301',
      content: 'Precisamos discutir o caso',
      sender: 'contact',
      timestamp: new Date(Date.now() - 86400000 * 2),
      status: 'read'
    },
    {
      id: '302',
      content: 'Sim, podemos agendar uma reunião',
      sender: 'user',
      timestamp: new Date(Date.now() - 86400000),
      status: 'read'
    },
    {
      id: '303',
      content: 'Vamos agendar uma reunião?',
      sender: 'contact',
      timestamp: new Date(Date.now() - 1800000),
      status: 'delivered'
    },
  ],
  '4': [
    {
      id: '401',
      content: 'Preciso dos documentos do processo 2023/456',
      sender: 'user',
      timestamp: new Date(Date.now() - 86400000),
      status: 'read'
    },
    {
      id: '402',
      content: 'Documentos enviados conforme solicitado',
      sender: 'contact',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
  ],
};

const ChatInterface: React.FC = () => {
  const [activeContact, setActiveContact] = useState<Contact | null>(mockContacts[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Filtrar contatos com base na pesquisa e na aba ativa
  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'unread' && (contact.unreadCount && contact.unreadCount > 0)) ||
      (activeTab === 'online' && contact.status === 'online');
    
    return matchesSearch && matchesTab;
  });

  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeContact) return;
    
    // Em uma aplicação real, aqui você enviaria a mensagem para o backend
    // e atualizaria o estado após confirmação
    
    // Simulação de envio
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      content: messageInput,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };
    
    console.log('Enviando mensagem:', newMessage);
    setMessageInput('');
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-muted-foreground" />;
      case 'sent':
        return <Check className="h-3 w-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] overflow-hidden rounded-md border">
      {/* Sidebar de Contatos */}
      <div className="w-1/3 border-r bg-muted/30">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Pesquisar contatos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">Não lidos</TabsTrigger>
              <TabsTrigger value="online" className="flex-1">Online</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="px-2">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id}
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${activeContact?.id === contact.id ? 'bg-primary/10' : 'hover:bg-muted'}`}
                onClick={() => setActiveContact(contact)}
              >
                <div className="relative">
                  <Avatar>
                    <div className="bg-muted h-10 w-10 rounded-full flex items-center justify-center">
                      {contact.avatar ? (
                        <img src={contact.avatar} alt={contact.name} className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <span className="text-lg font-medium">{contact.name.charAt(0)}</span>
                      )}
                    </div>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${contact.status === 'online' ? 'bg-green-500' : contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium truncate">{contact.name}</h4>
                    {contact.lastActive && (
                      <span className="text-xs text-muted-foreground">
                        {formatTime(contact.lastActive)}
                      </span>
                    )}
                  </div>
                  {contact.lastMessage && (
                    <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                  )}
                </div>
                
                {contact.unreadCount && contact.unreadCount > 0 && (
                  <Badge variant="default" className="rounded-full h-5 min-w-5 flex items-center justify-center">
                    {contact.unreadCount}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Área de Chat */}
      {activeContact ? (
        <div className="flex-1 flex flex-col">
          {/* Cabeçalho do Chat */}
          <div className="border-b p-4 flex justify-between items-center bg-card">
            <div className="flex items-center gap-3">
              <Avatar>
                <div className="bg-muted h-10 w-10 rounded-full flex items-center justify-center">
                  {activeContact.avatar ? (
                    <img src={activeContact.avatar} alt={activeContact.name} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <span className="text-lg font-medium">{activeContact.name.charAt(0)}</span>
                  )}
                </div>
              </Avatar>
              <div>
                <h3 className="font-medium">{activeContact.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {activeContact.status === 'online' ? 'Online' : 
                   activeContact.status === 'away' ? 'Ausente' : 'Offline'}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Mensagens */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {mockMessages[activeContact.id]?.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-3 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                  >
                    <p>{message.content}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 text-xs ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === 'user' && getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Input de Mensagem */}
          <div className="border-t p-4 bg-card">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input 
                placeholder="Digite sua mensagem..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-muted/10">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Selecione um contato</h3>
            <p className="text-muted-foreground">Escolha um contato para iniciar uma conversa</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;