import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface LegalSuggestion {
  id: string;
  title: string;
  description: string;
  type: 'action' | 'document' | 'precedent' | 'strategy';
  priority: 'high' | 'medium' | 'low';
  relevance: number; // 0-100
}

export const useLegalSuggestions = () => {
  const [suggestions, setSuggestions] = useState<LegalSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateSuggestions = async (query: string, context: string) => {
    if (!query.trim()) return;
    
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: `Com base na seguinte consulta e contexto jurídico, gere 3-5 sugestões jurídicas práticas e relevantes. Para cada sugestão, forneça: título, descrição breve, tipo (action, document, precedent, strategy), prioridade (high, medium, low) e relevância (0-100)\n\nConsulta: ${query}\n\nContexto: ${context}`,
          context: 'O utilizador está a solicitar sugestões jurídicas práticas. Forneça recomendações específicas, acionáveis e relevantes para o contexto jurídico apresentado.',
          role: 'lawyer',
          model: 'gpt-4o-mini'
        },
      });

      if (error) throw error;

      // Processar a resposta para extrair as sugestões estruturadas
      const extractedSuggestions = extractSuggestionsFromResponse(data.response);
      setSuggestions(extractedSuggestions);
      return extractedSuggestions;
    } catch (error) {
      console.error('Erro ao gerar sugestões jurídicas:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível gerar sugestões jurídicas. Por favor, tente novamente.',
        variant: 'destructive',
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Função para extrair sugestões estruturadas da resposta da IA
  const extractSuggestionsFromResponse = (response: string): LegalSuggestion[] => {
    const suggestions: LegalSuggestion[] = [];
    
    // Padrão para identificar sugestões numeradas
    const suggestionPattern = /\d+\.\s+(.+?)\n([\s\S]*?)(?=\n\d+\.|$)/g;
    let match;
    
    while ((match = suggestionPattern.exec(response)) !== null) {
      const title = match[1].trim();
      const content = match[2].trim();
      
      // Extrair descrição
      const descriptionMatch = content.match(/Descrição:?\s*(.+?)(?=\n|$)/i);
      const description = descriptionMatch ? descriptionMatch[1].trim() : '';
      
      // Extrair tipo
      const typeMatch = content.match(/Tipo:?\s*(.+?)(?=\n|$)/i);
      let type = typeMatch ? typeMatch[1].toLowerCase().trim() : 'action';
      // Garantir que o tipo seja um dos valores válidos
      if (!type || !['action', 'document', 'precedent', 'strategy'].includes(type)) {
        type = 'action';
      }
      
      // Extrair prioridade
      const priorityMatch = content.match(/Prioridade:?\s*(.+?)(?=\n|$)/i);
      let priority = priorityMatch ? priorityMatch[1].toLowerCase().trim() : 'medium';
      if (!['high', 'medium', 'low'].includes(priority)) {
        priority = 'medium';
      }
      
      // Extrair relevância
      const relevanceMatch = content.match(/Relevância:?\s*(\d+)/i);
      let relevance = relevanceMatch ? parseInt(relevanceMatch[1]) : 70;
      if (isNaN(relevance) || relevance < 0 || relevance > 100) {
        relevance = 70;
      }
      
      suggestions.push({
        id: `suggestion-${suggestions.length + 1}`,
        title,
        description,
        type: type as 'action' | 'document' | 'precedent' | 'strategy',
        priority: priority as 'high' | 'medium' | 'low',
        relevance
      });
    }
    
    // Se não conseguir extrair sugestões estruturadas, cria uma sugestão genérica
    if (suggestions.length === 0) {
      suggestions.push({
        id: 'suggestion-1',
        title: 'Recomendação Geral',
        description: response.substring(0, 200) + (response.length > 200 ? '...' : ''),
        type: 'action',
        priority: 'medium',
        relevance: 70
      });
    }
    
    return suggestions;
  };

  return {
    suggestions,
    isLoading,
    generateSuggestions,
    setSuggestions
  };
};