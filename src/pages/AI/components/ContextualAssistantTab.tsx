import { Card, CardContent } from '@/components/ui/card';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import ContextPanel from './ContextPanel';
import { useContextualAssistant } from '../hooks/useContextualAssistant';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SmartSuggestions from './SmartSuggestions';

const ContextualAssistantTab = () => {
  const [showContextPanel, setShowContextPanel] = useState(false);
  
  const {
    messages,
    loading,
    input,
    setInput,
    handleSubmit,
    messagesEndRef,
    contextInfo,
    updateContext,
    setContext,
    isContextSet
  } = useContextualAssistant();

  return (
    <Card className="flex flex-col h-[75vh]">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Assistente Jurídico Inteligente</h2>
          <p className="text-sm text-muted-foreground">
            {isContextSet 
              ? `Contexto: ${contextInfo.area} | ${contextInfo.jurisdiction}` 
              : 'Configure o contexto jurídico para respostas mais precisas'}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowContextPanel(!showContextPanel)}
        >
          {showContextPanel ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {showContextPanel ? 'Ocultar Contexto' : 'Configurar Contexto'}
        </Button>
      </div>
      
      {showContextPanel && (
        <ContextPanel 
          contextInfo={contextInfo}
          updateContext={updateContext}
          setContext={setContext}
          isContextSet={isContextSet}
        />
      )}
      
      <CardContent className="flex-grow overflow-auto p-0">
        <div className="p-4">
          <MessageList messages={messages} messagesEndRef={messagesEndRef} />
          {isContextSet && (
            <SmartSuggestions 
              messages={messages} 
              contextInfo={contextInfo} 
              isContextSet={isContextSet} 
            />
          )}
        </div>
      </CardContent>
      
      <MessageInput 
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Card>
  );
};

export default ContextualAssistantTab;