import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface ExtractedInfo {
  documentType: string;
  parties: string[];
  dates: string[];
  keyTerms: string[];
  obligations: string[];
  risks: string[];
  rawText: string;
}

export const useDocumentExtraction = () => {
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  const extractDocumentInfo = async (documentText: string, documentName: string) => {
    if (!documentText) {
      toast({
        title: 'Erro',
        description: 'Texto do documento vazio. Não é possível extrair informações.',
        variant: 'destructive',
      });
      return null;
    }

    setIsExtracting(true);

    try {
      // Enviar o texto para análise pela IA
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: `Analise este documento jurídico e extraia as seguintes informações em formato estruturado:\n\n1. Tipo de documento\n2. Partes envolvidas\n3. Datas importantes\n4. Termos-chave\n5. Obrigações principais\n6. Riscos potenciais\n\nDocumento: ${documentText}`,
          context: 'O utilizador está a solicitar extração de informações estruturadas de um documento jurídico. Forneça uma análise detalhada, identificando os elementos solicitados de forma organizada.',
          role: 'lawyer',
          model: 'gpt-4o'
        },
      });

      if (error) throw error;

      // Processar a resposta da IA para extrair informações estruturadas
      const processedInfo = processAIResponse(data.response, documentText, documentName);
      setExtractedInfo(processedInfo);
      return processedInfo;
    } catch (error) {
      console.error('Erro ao extrair informações do documento:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível extrair informações do documento. Por favor, tente novamente.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsExtracting(false);
    }
  };

  // Função para processar a resposta da IA e extrair informações estruturadas
  const processAIResponse = (aiResponse: string, rawText: string, documentName: string): ExtractedInfo => {
    // Esta é uma implementação simplificada
    // Em um cenário real, você usaria regex ou parsing mais sofisticado
    
    const extractSection = (text: string, sectionName: string): string[] => {
      const regex = new RegExp(`${sectionName}[:s]*(.*?)(?=\n\n|\n[0-9]|$)`, 's');
      const match = text.match(regex);
      if (!match || !match[1]) return [];
      return match[1]
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.startsWith('- ') || item.startsWith('* '))
        .map(item => item.replace(/^[-*]\s+/, ''))
        .filter(Boolean);
    };

    // Extrair tipo de documento
    const documentTypeMatch = aiResponse.match(/Tipo de documento[:\s]*(.*?)(?=\n|$)/);
    const documentType = documentTypeMatch && documentTypeMatch[1] ? documentTypeMatch[1].trim() : documentName;

    // Extrair outras seções
    const parties = extractSection(aiResponse, 'Partes envolvidas');
    const dates = extractSection(aiResponse, 'Datas importantes');
    const keyTerms = extractSection(aiResponse, 'Termos-chave');
    const obligations = extractSection(aiResponse, 'Obrigações principais');
    const risks = extractSection(aiResponse, 'Riscos potenciais');

    return {
      documentType,
      parties,
      dates,
      keyTerms,
      obligations,
      risks,
      rawText
    };
  };

  return {
    extractedInfo,
    isExtracting,
    extractDocumentInfo,
    setExtractedInfo
  };
};