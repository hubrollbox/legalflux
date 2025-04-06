
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useMessages } from '../hooks/useMessages';

const AssistantTab = () => {
  const {
    messages,
    loading,
    input,
    setInput,
    handleSubmit,
    messagesEndRef
  } = useMessages('Olá, advogado! Sou o seu assistente jurídico virtual. Como posso ajudá-lo hoje? Posso realizar pesquisas jurídicas, ajudar na redação de documentos ou fornecer análises de precedentes.');

  return (
    <Card className="flex flex-col h-[75vh]">
      <CardHeader className="pb-3">
        <CardTitle>Assistente Jurídico</CardTitle>
        <CardDescription>
          Faça perguntas sobre casos, legislação ou procedimentos
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-auto">
        <MessageList messages={messages} messagesEndRef={messagesEndRef} />
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

export default AssistantTab;
