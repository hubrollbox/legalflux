import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, Loader2, FileText, List } from 'lucide-react';
import { useMessages } from '../hooks/useMessages';
import MessageList from './MessageList';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useDocumentExtraction } from '../hooks/useDocumentExtraction';
import ExtractedInfoDisplay from './ExtractedInfoDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AnalysisTab = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisTab, setAnalysisTab] = useState('text');
  const { toast } = useToast();
  
  const {
    messages,
    setMessages,
    loading,
    messagesEndRef
  } = useMessages();
  
  const {
    extractedInfo,
    isExtracting,
    extractDocumentInfo
  } = useDocumentExtraction();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const analyzeDocument = async () => {
    if (!file) {
      toast({
        title: 'Erro',
        description: 'Por favor, selecione um documento para análise.',
        variant: 'destructive',
      });
      return;
    }

    setAnalyzing(true);
    setMessages([]);

    try {
      // Simular extração de texto do documento
      // Em uma implementação real, você usaria uma API para extrair texto do PDF/DOCX
      const documentText = await simulateTextExtraction(file);
      
      // Extrair informações estruturadas do documento
      await extractDocumentInfo(documentText, file.name);
      
      // Enviar o texto para análise pela IA
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: `Analise este documento jurídico e forneça um resumo detalhado, identificando pontos importantes, possíveis problemas e recomendações: ${documentText}`,
          context: 'O utilizador está a solicitar análise de um documento jurídico. Forneça uma análise detalhada, identificando cláusulas importantes, possíveis problemas e recomendações.',
          role: 'lawyer',
          model: 'gpt-4o'
        },
      });

      if (error) throw error;

      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: `### Análise do documento: ${file.name}\n\n${data.response}`,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Erro ao analisar documento:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível analisar o documento. Por favor, tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setAnalyzing(false);
    }
  };

  // Função para simular extração de texto de um documento
  // Em uma implementação real, você usaria uma API para extrair texto do PDF/DOCX
  const simulateTextExtraction = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`[Conteúdo extraído do documento ${file.name}]\n\nEste é um contrato de prestação de serviços entre as partes A e B...\n\nCláusula 1: Objeto\nCláusula 2: Prazo\nCláusula 3: Valor\nCláusula 4: Obrigações\nCláusula 5: Rescisão`);
      }, 1500);
    });
  };

  return (
    <Card className="flex flex-col h-[75vh]">
      <CardHeader className="pb-3">
        <CardTitle>Análise de Documentos</CardTitle>
        <CardDescription>
          Faça upload de documentos jurídicos para análise pela IA
        </CardDescription>
        <div className="flex flex-col space-y-3 mt-2">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              onClick={() => document.getElementById('file-upload')?.click()}
              className="flex-grow"
            >
              <FileUp className="h-4 w-4 mr-2" />
              {file ? file.name : 'Selecionar documento'}
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button 
              onClick={analyzeDocument} 
              disabled={analyzing || !file || isExtracting}
            >
              {(analyzing || isExtracting) ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileText className="h-4 w-4 mr-2" />}
              Analisar
            </Button>
          </div>
          {file && (
            <div className="text-sm text-muted-foreground">
              Documento selecionado: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </div>
          )}
        </div>
      </CardHeader>
      
      {(messages.length > 0 || extractedInfo) && (
        <div className="px-6 pb-2">
          <Tabs value={analysisTab} onValueChange={setAnalysisTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-[400px] mx-auto">
              <TabsTrigger value="text">
                <FileText className="h-4 w-4 mr-2" />
                Análise Textual
              </TabsTrigger>
              <TabsTrigger value="structured">
                <List className="h-4 w-4 mr-2" />
                Informações Extraídas
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
      
      <CardContent className="flex-grow overflow-auto">
        <TabsContent value="text" className="mt-0">
          <MessageList messages={messages} messagesEndRef={messagesEndRef} />
        </TabsContent>
        
        <TabsContent value="structured" className="mt-0">
          {extractedInfo ? (
            <ExtractedInfoDisplay extractedInfo={extractedInfo} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {isExtracting ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="h-8 w-8 animate-spin mb-2" />
                  <p>Extraindo informações do documento...</p>
                </div>
              ) : (
                <p>Nenhuma informação extraída. Selecione um documento e clique em Analisar.</p>
              )}
            </div>
          )}
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default AnalysisTab;