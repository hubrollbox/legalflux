
import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ProcessesData } from './data/mockData';
import ReactMarkdown from 'react-markdown';
import PageTransition from '@/components/PageTransition';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeProcess, setActiveProcess] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mensagem de boas-vindas para mostrar quando a tela é carregada pela primeira vez
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: 'Olá! Sou o seu assistente jurídico virtual. Como posso ajudá-lo hoje? Pode perguntar-me sobre os seus processos, termos jurídicos ou procedimentos.',
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length]);

  // Scroll para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    // Add temporary loading message
    const loadingMessageId = (Date.now() + 1).toString();
    const loadingMessage: Message = {
      id: loadingMessageId,
      role: 'assistant',
      content: 'Thinking...',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Obtém o contexto do processo ativo (se selecionado)
      let processContext = '';
      if (activeProcess) {
        const selectedProcess = ProcessesData.find(p => p.id === activeProcess);
        if (selectedProcess) {
          processContext = `Processo: ${selectedProcess.title}. 
          Tipo: ${selectedProcess.type}. 
          Status: ${selectedProcess.status}. 
          Descrição: ${selectedProcess.description || 'Não disponível'}.`;
        }
      }

      // Chama a função Edge do Supabase
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: input,
          context: processContext,
          role: 'client',
        },
      });

      if (error) throw error;

      // Adiciona a resposta do assistente ao chat
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error calling AI assistant:', error);
      
      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.content !== 'Thinking...'));
      
      // Add error message
      const errorMessageId = (Date.now() + 2).toString();
      const errorMessage: Message = {
        id: errorMessageId,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto pb-8">
        <h1 className="text-2xl font-bold mb-6">Assistente Jurídico Virtual</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar com processos */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Meus Processos</CardTitle>
              <CardDescription>Selecione para obter respostas contextualizadas</CardDescription>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-2">
                {ProcessesData.slice(0, 5).map((process) => (
                  <Button 
                    key={process.id}
                    variant={activeProcess === process.id ? "default" : "outline"}
                    className="w-full justify-start text-left h-auto py-2"
                    onClick={() => setActiveProcess(process.id)}
                  >
                    <div>
                      <div className="font-medium">{process.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {process.type} • {process.status}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Área principal do chat */}
          <Card className="md:col-span-3 flex flex-col h-[75vh]">
            <CardHeader className="pb-3">
              <CardTitle>Assistente Virtual</CardTitle>
              {activeProcess && (
                <Badge variant="outline" className="mb-2">
                  Respondendo sobre: {ProcessesData.find(p => p.id === activeProcess)?.title}
                </Badge>
              )}
              <CardDescription>
                Tire dúvidas sobre seus processos, conceitos jurídicos ou procedimentos
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow overflow-auto">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Avatar className={`h-8 w-8 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                        {message.role === 'assistant' ? (
                          <AvatarImage src="/icons/icon-128x128.png" alt="Assistant" />
                        ) : (
                          <AvatarImage src={user?.avatar || ''} alt={user?.name || 'User'} />
                        )}
                        <AvatarFallback>
                          {message.role === 'assistant' ? 'AI' : user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className={`
                        rounded-lg p-3 text-sm
                        ${message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                        }
                      `}>
                        {message.role === 'assistant' ? (
                          <ReactMarkdown>
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          <p>{message.content}</p>
                        )}
                        <div className={`
                          text-xs mt-1 opacity-70 
                          ${message.role === 'user' ? 'text-right' : 'text-left'}
                        `}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            
            {/* Input area */}
            <div className="p-4 border-t mt-auto">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escreva a sua pergunta..."
                  className="flex-grow min-h-10 max-h-32"
                  disabled={loading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default AIAssistant;
