
import React from 'react';
import { Message } from '../../types';
import ChatErrorMessage from '@/components/ui/chat-error-message';
import { formatTime } from '../../utils/formatUtils';

interface ChatMessageProps {
  message: Message;
  onTryFix?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onTryFix }) => {
  return (
    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      {message.isError ? (
        <ChatErrorMessage 
          message={message.content} 
          onTryFix={onTryFix}
        />
      ) : (
        <div
          className={`max-w-[80%] rounded-xl p-4 ${
            message.isUser
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-white border border-gray-100 shadow-sm'
          }`}
        >
          <div className="mb-1">{message.content}</div>
          <div className={`text-xs ${message.isUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
