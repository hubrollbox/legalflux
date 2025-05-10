
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  disabled: boolean;
  className?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  className
}) => {
  return (
    <Textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      rows={1}
      style={{ resize: 'none' }}
    />
  );
};

export default MessageInput;
