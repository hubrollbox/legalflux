import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Message } from '../types';
import { Bot, Send, User } from 'lucide-react';
import { nanoid } from 'nanoid';

const AssistantTab: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou o seu assistente jurídico. Como posso ajudar?',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fix the ref type to accept null
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: nanoid(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate a response from the assistant after a short delay
    setTimeout(() => {
      const assistantResponse: Message = {
        id: nanoid(),
        role: 'assistant',
        content: `Resposta simulada para: ${input}`,
        timestamp: new Date(),
      };

      setMessages(prevMessages => [...prevMessages, assistantResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <Card className="w-full h-full flex flex-col">
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex items-start space-x-2 max-w-[80%]">
                {message.role === 'assistant' && (
                  <Bot className="h-5 w-5 text-blue-500 flex-shrink-0" />
                )}
                <div className={`rounded-lg p-3 text-sm ${message.role === 'user' ? 'bg-gray-100' : 'bg-blue-500 text-white'}`}>
                  <p>{message.content}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                {message.role === 'user' && (
                  <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-[80%]">
                <Bot className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <div className="rounded-lg p-3 text-sm bg-blue-500 text-white">
                  <p>Carregando...</p>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <div className="p-4 border-t">
        <div className="flex space-x-3">
          <Textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Escreva sua mensagem..."
            className="flex-grow"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            Enviar <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AssistantTab;
