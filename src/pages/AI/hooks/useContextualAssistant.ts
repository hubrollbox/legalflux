import { useState } from 'react';
import { useMessages } from './useMessages';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface ContextualInfo {
  area: string;
  jurisdiction: string;
  caseDetails?: string;
  clientType?: string;
}

export const useContextualAssistant = () => {
  const [contextInfo, setContextInfo] = useState<ContextualInfo>({
    area: 'Geral',
    jurisdiction: 'Portugal',
    caseDetails: '',
    clientType: 'individual'
  });
  
  const [isContextSet, setIsContextSet] = useState(false);
  const { toast } = useToast();
  
  const messagesHook = useMessages(
    'Olá, advogado! Sou o seu assistente jurídico virtual. Para respostas mais precisas, por favor configure o contexto jurídico do seu caso.'
  );
  
  const updateContext = (newContext: Partial<ContextualInfo>) => {
    setContextInfo(prev => ({
      ...prev,
      ...newContext
    }));
  };
  
  const setContext = async () => {
    try {
      // Informar ao usuário que o contexto foi configurado
      messagesHook.setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: `✅ Contexto jurídico configurado:\n\n- Área: ${contextInfo.area}\n- Jurisdição: ${contextInfo.jurisdiction}${contextInfo.caseDetails ? `\n- Detalhes do caso: ${contextInfo.caseDetails}` : ''}${contextInfo.clientType ? `\n- Tipo de cliente: ${contextInfo.clientType}` : ''}\n\nAgora posso fornecer respostas mais precisas e relevantes para o seu contexto específico.`,
          timestamp: new Date()
        }
      ]);
      
      setIsContextSet(true);
    } catch (error) {
      console.error('Erro ao configurar contexto:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível configurar o contexto. Por favor, tente novamente.',
        variant: 'destructive',
      });
    }
  };
  
  const handleSubmitWithContext = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messagesHook.input.trim()) return;
    
    // Construir o contexto para enviar ao assistente
    const contextString = `Área jurídica: ${contextInfo.area}. Jurisdição: ${contextInfo.jurisdiction}. ${contextInfo.caseDetails ? `Detalhes do caso: ${contextInfo.caseDetails}.` : ''} ${contextInfo.clientType ? `Tipo de cliente: ${contextInfo.clientType}.` : ''}`;
    
    // Adicionar mensagem do usuário
    const userMessageId = Date.now().toString();
    const userMessage = {
      id: userMessageId,
      role: 'user' as const,
      content: messagesHook.input,
      timestamp: new Date()
    };
    
    messagesHook.setMessages(prev => [...prev, userMessage]);
    messagesHook.setInput('');
    messagesHook.setLoading(true);

    try {
      // Chamar a função Edge com o contexto
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: messagesHook.input,
          context: contextString,
          role: 'lawyer',
          model: 'gpt-4o-mini'
        },
      });

      if (error) throw error;

      // Adicionar resposta do assistente
      messagesHook.setMessages(prev => [
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
      messagesHook.setLoading(false);
    }
  };
  
  return {
    ...messagesHook,
    contextInfo,
    updateContext,
    setContext,
    isContextSet,
    handleSubmit: handleSubmitWithContext
  };
};