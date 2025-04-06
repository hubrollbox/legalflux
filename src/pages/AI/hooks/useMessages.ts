
import { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useMessages = (initialMessage?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0 && initialMessage) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: initialMessage,
          timestamp: new Date()
        }
      ]);
    }
  }, [initialMessage, messages.length]);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent, context?: string, role: 'lawyer' | 'client' = 'lawyer', model: string = 'gpt-4o-mini') => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessageId = Date.now().toString();
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Call the Edge function
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          prompt: input,
          context: context || '',
          role: role,
          model: model
        },
      });

      if (error) throw error;

      // Add assistant response
      setMessages(prev => [
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
      setLoading(false);
    }
  };

  return {
    messages,
    setMessages,
    loading,
    input,
    setInput,
    handleSubmit,
    messagesEndRef
  };
};
