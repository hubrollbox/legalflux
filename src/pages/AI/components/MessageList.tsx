
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from '../types';
import { useAuth } from '@/hooks/useAuth';
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList = ({ messages, messagesEndRef }: MessageListProps) => {
  const { user } = useAuth();

  return (
    <div className="space-y-4 pb-4">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <Avatar className={`h-8 w-8 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
              {message.role === 'assistant' ? (
                <AvatarImage src="/icons/icon-128x128.png" alt="Assistant" />
              ) : (
                <AvatarImage src={user?.avatar || ''} alt={user?.name || 'User'} />
              )}
              <AvatarFallback>
                {message.role === 'assistant' ? 'AI' : user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className={`
              rounded-lg p-3 text-sm
              ${message.role === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
              }
            `}>
              {message.role === 'assistant' ? (
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>
              ) : (
                <p>{message.content}</p>
              )}
              <div className={`
                text-xs mt-1 opacity-70 
                ${message.role === 'user' ? 'text-right' : 'text-left'}
              `}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
