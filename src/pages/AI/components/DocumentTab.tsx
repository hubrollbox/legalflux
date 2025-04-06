
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { File, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMessages } from '../hooks/useMessages';
import MessageList from './MessageList';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const DocumentTab = () => {
  const [documentType, setDocumentType] = useState('contract');
  const { toast } = useToast();
  const {
    messages,
    setMessages,
    loading,
    messagesEndRef
  } = useMessages();

  const generateDocument = async () => {
    if (!documentType) return;
    
    try {
      setMessages([]);
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
    }
  };

  return (
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
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
      </CardContent>
    </Card>
  );
};

export default DocumentTab;
