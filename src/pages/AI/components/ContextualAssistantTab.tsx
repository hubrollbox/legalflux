import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Message } from '../types';
import { Bot, Send, User } from 'lucide-react';
import { nanoid } from 'nanoid';

// Update the refs to accept null
const messagesEndRef = useRef<HTMLDivElement>(null);

interface ContextualAssistantTabProps {
  contextText: string;
}

const ContextualAssistantTab: React.FC<ContextualAssistantTabProps> = ({ contextText }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou o seu assistente jurídico contextual. Como posso ajudar com este documento?',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setIsLoading(true);
    // Simulate a response from the assistant
    setTimeout(() => {
      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: `Resposta simulada para: "${input}". Contexto: ${contextText}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
      scrollToBottom();
    }, 1500);
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="h-64 overflow-y-auto space-y-2">
          {messages.map(message => (
            <div key={message.id} className={`flex flex-col text-sm w-full ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className="flex items-center space-x-2">
                {message.role === 'assistant' && <Bot className="h-4 w-4 text-muted-foreground" />}
                <div className="rounded-lg border px-3 py-1.5 max-w-sm prose-sm" style={{ whiteSpace: 'pre-wrap' }}>
                  <p>{message.content}</p>
                </div>
                {message.role === 'user' && <User className="h-4 w-4 text-muted-foreground" />}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Textarea
            placeholder="Escreva a sua pergunta..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 resize-none border-none shadow-sm focus:ring-0 focus-visible:ring-0"
            rows={1}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'A processar...' : <Send className="h-4 w-4 mr-2" />}
            {isLoading ? null : 'Enviar'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContextualAssistantTab;
