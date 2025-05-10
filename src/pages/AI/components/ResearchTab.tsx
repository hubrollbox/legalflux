
import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Message } from '../types';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

interface ResearchTabProps {
  onSendMessage: (message: string) => void;
  messages: Message[];
  isLoading: boolean;
}

const ResearchTab: React.FC<ResearchTabProps> = ({ 
  onSendMessage, 
  messages, 
  isLoading 
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <MessageList 
          messages={messages}
          messagesEndRef={messagesEndRef}
        />
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <MessageInput 
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Faça uma pergunta para pesquisa jurídica..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!inputValue.trim() || isLoading}
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResearchTab;
