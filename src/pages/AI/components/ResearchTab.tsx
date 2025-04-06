
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, Loader2 } from 'lucide-react';
import { useMessages } from '../hooks/useMessages';
import MessageList from './MessageList';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const { toast } = useToast();

const ResearchTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    messages,
    setMessages,
    loading,
    messagesEndRef
  } = useMessages();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    const context = 'O utilizador está a realizar uma pesquisa jurídica. Forneça informações detalhadas, precedentes relevantes e análise doutrinária sobre o tema.';
    
    try {
      setMessages([]);
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: `Pesquisa jurídica sobre: ${searchQuery}`,
          context: context,
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
    }
  };

  return (
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
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
      </CardContent>
    </Card>
  );
};

export default ResearchTab;
