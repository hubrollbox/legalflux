
import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, BookOpen, File, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import ReactMarkdown from 'react-markdown';
import PageTransition from '@/components/PageTransition';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const LawyerAssistant = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('assistant');
  const [documentType, setDocumentType] = useState('contract');
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
          content: 'Olá, advogado! Sou o seu assistente jurídico virtual. Como posso ajudá-lo hoje? Posso realizar pesquisas jurídicas, ajudar na redação de documentos ou fornecer análises de precedentes.',
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Scroll para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Adiciona a mensagem do usuário ao chat
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

    try {
      let context = '';
      if (activeTab === 'document') {
        context = `O utilizador está a solicitar ajuda para redigir um documento do tipo: ${documentType}. Forneça um modelo e orientações para a redação deste tipo de documento.`;
      }

      // Chama a função Edge do Supabase
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: input,
          context: context,
          role: 'lawyer',
          model: 'gpt-4o-mini'
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
      console.error('Erro ao chamar o assistente de IA:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível obter uma resposta. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: `Pesquisa jurídica sobre: ${searchQuery}`,
          context: 'O utilizador está a realizar uma pesquisa jurídica. Forneça informações detalhadas, precedentes relevantes e análise doutrinária sobre o tema.',
          role: 'lawyer',
          model: 'gpt-4o-mini'
        },
      });

      if (error) throw error;

      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `### Resultados da pesquisa: "${searchQuery}"\n\n${data.response}`,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Erro ao realizar pesquisa:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível realizar a pesquisa. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateDocument = async () => {
    if (!documentType) return;
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: `Gere um modelo de ${documentType} em português de Portugal.`,
          context: 'O utilizador está a solicitar um modelo de documento jurídico. Forneça um modelo completo seguindo as melhores práticas jurídicas portuguesas.',
          role: 'lawyer',
          model: 'gpt-4o-mini'
        },
      });

      if (error) throw error;

      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `### Modelo de ${documentType}\n\n${data.response}`,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Erro ao gerar documento:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível gerar o documento. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto pb-8">
        <h1 className="text-2xl font-bold mb-6">Assistente Jurídico para Advogados</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="assistant">
              Assistente
            </TabsTrigger>
            <TabsTrigger value="research">
              Pesquisa Jurídica
            </TabsTrigger>
            <TabsTrigger value="document">
              Redação de Documentos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="assistant" className="mt-0">
            <Card className="flex flex-col h-[75vh]">
              <CardHeader className="pb-3">
                <CardTitle>Assistente Jurídico</CardTitle>
                <CardDescription>
                  Faça perguntas sobre casos, legislação ou procedimentos
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
          </TabsContent>
          
          <TabsContent value="research" className="mt-0">
            <Card className="flex flex-col h-[75vh]">
              <CardHeader className="pb-3">
                <CardTitle>Pesquisa Jurídica</CardTitle>
                <CardDescription>
                  Pesquise legislação, jurisprudência e doutrina
                </CardDescription>
                <div className="flex space-x-2 mt-2">
                  <Input 
                    placeholder="O que deseja pesquisar?" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                  <Button onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
                    {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <BookOpen className="h-4 w-4 mr-2" />}
                    Pesquisar
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow overflow-auto">
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex justify-start">
                      <div className="flex max-w-full">
                        <div className="rounded-lg p-4 text-sm bg-muted">
                          <ReactMarkdown>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="document" className="mt-0">
            <Card className="flex flex-col h-[75vh]">
              <CardHeader className="pb-3">
                <CardTitle>Redação de Documentos</CardTitle>
                <CardDescription>
                  Gere modelos de documentos jurídicos
                </CardDescription>
                <div className="flex space-x-2 mt-2">
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger className="flex-grow">
                      <SelectValue placeholder="Selecione o tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contract">Contrato</SelectItem>
                      <SelectItem value="petition">Petição Inicial</SelectItem>
                      <SelectItem value="power-of-attorney">Procuração</SelectItem>
                      <SelectItem value="complaint">Reclamação</SelectItem>
                      <SelectItem value="legal-opinion">Parecer Jurídico</SelectItem>
                      <SelectItem value="settlement">Acordo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={generateDocument} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <File className="h-4 w-4 mr-2" />}
                    Gerar
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow overflow-auto">
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex justify-start">
                      <div className="flex max-w-full">
                        <div className="rounded-lg p-4 text-sm bg-muted">
                          <ReactMarkdown>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default LawyerAssistant;
