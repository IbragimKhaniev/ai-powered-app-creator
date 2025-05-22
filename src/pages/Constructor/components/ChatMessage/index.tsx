
import React, { useState, useEffect } from 'react';
import { Message } from '../../types';
import ChatErrorMessage from '@/components/ui/chat-error-message';
import { formatTime } from '../../utils/formatUtils';
import TypedMessage from '../TypedMessage';

interface ChatMessageProps {
  message: Message;
  onTryFix?: () => void;
  isNewMessage?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onTryFix,
  isNewMessage = false
}) => {
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
          <TypedMessage 
            content={message.content}
            showAnimation={!message.isUser && isNewMessage}
            className="mb-1"
          />
          <div className={`text-xs ${message.isUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
