
import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, FileText, Search, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ReactMarkdown from 'react-markdown';
import PageTransition from '@/components/PageTransition';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
}

const LawyerAssistant = () => {
  const [activeTab, setActiveTab] = useState('legalResearch');
  const [input, setInput] = useState('');
  const [documentInput, setDocumentInput] = useState('');
  const [researchMessages, setResearchMessages] = useState<Message[]>([]);
  const [draftingMessages, setDraftingMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [researchMessages, draftingMessages]);

  // Mensagens iniciais
  useEffect(() => {
    if (researchMessages.length === 0) {
      setResearchMessages([
        {
          id: '1',
          content: 'Bem-vindo à Pesquisa Jurídica Inteligente. Como posso ajudá-lo hoje? Pode perguntar sobre jurisprudência, legislação ou conceitos jurídicos.',
          timestamp: new Date()
        }
      ]);
    }
    
    if (draftingMessages.length === 0) {
      setDraftingMessages([
        {
          id: '1',
          content: 'Bem-vindo ao Assistente de Redação Jurídica. Posso ajudá-lo a redigir, revisar ou melhorar documentos jurídicos. O que gostaria de criar hoje?',
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      content: input,
      timestamp: new Date()
    };
    
    // Adiciona a mensagem ao chat com base na aba ativa
    if (activeTab === 'legalResearch') {
      setResearchMessages(prev => [...prev, userMessage]);
    } else {
      const content = documentInput ? 
        `${input}\n\n**Contexto/Documento:**\n\`\`\`\n${documentInput}\n\`\`\`` : 
        input;
      
      const docMessage = {
        ...userMessage,
        content
      };
      setDraftingMessages(prev => [...prev, docMessage]);
    }
    
    setInput('');
    setLoading(true);

    try {
      // Contexto com base na aba ativa
      let context = '';
      let promptType = '';
      
      if (activeTab === 'legalResearch') {
        context = 'Pesquisa jurídica sobre: ' + input;
        promptType = 'Responda com foco em pesquisa jurídica, incluindo referências a legislação e jurisprudência quando relevante.';
      } else {
        context = documentInput || 'Não há contexto ou documento prévio';
        promptType = 'Auxiliar na redação/revisão de documentos jurídicos: ' + input;
      }

      // Chama a função Edge do Supabase
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: input,
          context: context,
          role: 'lawyer',
          promptType: promptType
        },
      });

      if (error) throw error;

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        timestamp: new Date()
      };
      
      // Adiciona a resposta com base na aba ativa
      if (activeTab === 'legalResearch') {
        setResearchMessages(prev => [...prev, aiResponse]);
      } else {
        setDraftingMessages(prev => [...prev, aiResponse]);
      }
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

  const activeMessages = activeTab === 'legalResearch' ? researchMessages : draftingMessages;

  const promptExamples = {
    research: [
      "Quais são os precedentes recentes sobre direito do consumidor em Portugal?",
      "Explique as implicações jurídicas do artigo 1225.º do Código Civil para responsabilidade em obras",
      "Como é tratada a proteção de dados pessoais na legislação portuguesa atual?"
    ],
    drafting: [
      "Redija uma cláusula de confidencialidade para contrato comercial",
      "Revise este contrato de arrendamento para melhorar a clareza e precisão jurídica",
      "Crie uma petição inicial para uma ação de indemnização por danos morais"
    ]
  };

  return (
    <PageTransition>
      <DashboardLayout>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">Assistente Jurídico Inteligente</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="legalResearch" className="flex items-center">
                <Search className="mr-2 h-4 w-4" />
                Pesquisa Jurídica
              </TabsTrigger>
              <TabsTrigger value="documentDrafting" className="flex items-center">
                <PenLine className="mr-2 h-4 w-4" />
                Redação de Documentos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="legalResearch">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Pesquisa Jurídica Inteligente</CardTitle>
                  <CardDescription>
                    Obtenha informações sobre legislação, jurisprudência e conceitos jurídicos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sugestões de pesquisa */}
                    <div className="lg:col-span-1">
                      <h3 className="text-sm font-medium mb-2">Sugestões de Pesquisa</h3>
                      <div className="space-y-2">
                        {promptExamples.research.map((example, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left h-auto py-2 text-sm"
                            onClick={() => setInput(example)}
                          >
                            {example}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Área de chat */}
                    <div className="lg:col-span-3 flex flex-col h-[60vh]">
                      <div className="flex-grow overflow-auto p-4 border rounded-md bg-background mb-4">
                        {activeMessages.map((message, index) => (
                          <div key={message.id} className={`mb-4 ${index % 2 === 0 ? 'bg-muted/50 p-3 rounded-md' : 'border-l-4 border-primary pl-3'}`}>
                            <ReactMarkdown>
                              {message.content}
                            </ReactMarkdown>
                            <div className="text-xs text-muted-foreground mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                      
                      <form onSubmit={handleSubmit} className="flex space-x-2">
                        <Textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Digite a sua pesquisa jurídica..."
                          className="flex-grow resize-none min-h-10"
                          disabled={loading}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSubmit(e);
                            }
                          }}
                        />
                        <Button type="submit" disabled={loading || !input.trim()}>
                          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                          Enviar
                        </Button>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documentDrafting">
              <Card className="border shadow-sm">
                <CardHeader>
                  <CardTitle>Assistente de Redação Jurídica</CardTitle>
                  <CardDescription>
                    Redigir, revisar e melhorar documentos jurídicos com a ajuda de IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sugestões de redação */}
                    <div className="lg:col-span-1">
                      <h3 className="text-sm font-medium mb-2">Sugestões de Redação</h3>
                      <div className="space-y-2">
                        {promptExamples.drafting.map((example, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left h-auto py-2 text-sm"
                            onClick={() => setInput(example)}
                          >
                            {example}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-2">Documento para Revisão (opcional)</h3>
                        <Textarea
                          value={documentInput}
                          onChange={(e) => setDocumentInput(e.target.value)}
                          placeholder="Cole o texto que deseja revisar ou usar como referência..."
                          className="w-full min-h-[150px]"
                        />
                      </div>
                    </div>
                    
                    {/* Área de chat */}
                    <div className="lg:col-span-3 flex flex-col h-[60vh]">
                      <div className="flex-grow overflow-auto p-4 border rounded-md bg-background mb-4">
                        {activeMessages.map((message, index) => (
                          <div key={message.id} className={`mb-4 ${index % 2 === 0 ? 'bg-muted/50 p-3 rounded-md' : 'border-l-4 border-primary pl-3'}`}>
                            <ReactMarkdown>
                              {message.content}
                            </ReactMarkdown>
                            <div className="text-xs text-muted-foreground mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                      
                      <form onSubmit={handleSubmit} className="flex space-x-2">
                        <Textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Descreva o documento que deseja criar ou a revisão que necessita..."
                          className="flex-grow resize-none min-h-10"
                          disabled={loading}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSubmit(e);
                            }
                          }}
                        />
                        <Button type="submit" disabled={loading || !input.trim()}>
                          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                          Enviar
                        </Button>
                      </form>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </PageTransition>
  );
};

export default LawyerAssistant;
