import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Loader2 } from 'lucide-react';
import { useLegalSuggestions } from '../hooks/useLegalSuggestions';
import SuggestionsList from './SuggestionsList';
import { Message } from '../types';
import { ContextualInfo } from '../hooks/useContextualAssistant';

interface SmartSuggestionsProps {
  messages: Message[];
  contextInfo: ContextualInfo;
  isContextSet: boolean;
}

const SmartSuggestions = ({ messages, contextInfo, isContextSet }: SmartSuggestionsProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [lastProcessedMessage, setLastProcessedMessage] = useState<string | null>(null);
  
  const {
    suggestions,
    isLoading,
    generateSuggestions
  } = useLegalSuggestions();

  // Gerar sugestões automaticamente quando houver novas mensagens do usuário
  useEffect(() => {
    generateSuggestions();
    lastProcessedMessage;
    if (!isContextSet || messages.length === 0) return;
    
    const userMessages = messages.filter(msg => msg.role === 'user');
    if (userMessages.length === 0) return;
    
    const lastUserMessage = userMessages[userMessages.length - 1];
    
    // Evitar gerar sugestões para a mesma mensagem repetidamente
    if (lastUserMessage.content === lastProcessedMessage) return;
    
    // Construir o contexto para as sugestões
    const contextString = `Área jurídica: ${contextInfo.area}. Jurisdição: ${contextInfo.jurisdiction}. ${contextInfo.caseDetails ? `Detalhes do caso: ${contextInfo.caseDetails}.` : ''} ${contextInfo.clientType ? `Tipo de cliente: ${contextInfo.clientType}.` : ''}`;
    
    // Gerar sugestões com base na última mensagem do usuário
    generateSuggestions(lastUserMessage.content, contextString);
    setLastProcessedMessage(lastUserMessage.content);
  }, [messages, isContextSet, contextInfo]);

  if (!isContextSet || messages.length === 0) return null;

  return (
    <div className="mt-4">
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full flex justify-between items-center" 
        onClick={() => setShowSuggestions(!showSuggestions)}
      >
        <span className="flex items-center">
          <Lightbulb className="h-4 w-4 mr-2" />
          Sugestões Inteligentes
        </span>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
      </Button>
      
      {showSuggestions && (
        <Card className="mt-2">
          <CardContent className="p-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Gerando sugestões...</span>
              </div>
            ) : suggestions && Array.isArray(suggestions) && suggestions.length > 0 ? (
              <SuggestionsList suggestions={suggestions.filter(s => s && typeof s === 'object' && s !== null)} />
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Nenhuma sugestão disponível para o contexto atual.
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartSuggestions;