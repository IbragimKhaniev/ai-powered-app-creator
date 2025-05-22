
import React, { useState, useEffect, useMemo } from 'react';
import { Message } from '../../types';
import ChatErrorMessage from '@/components/ui/chat-error-message';
import { formatTime } from '../../utils/formatUtils';
import TypedMessage from '../TypedMessage';
import { GetApplicationsApplicationIdMessages200Item } from '@/api/core';

interface ChatMessageProps {
  message: GetApplicationsApplicationIdMessages200Item;
  onTryFix?: () => void;
  isNewMessage?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onTryFix,
  isNewMessage = false
}) => {
  const isError = useMemo(() => message.status === 'error', []);
  const isUser = useMemo(() => message.role === 'user', []);
  const isLoading = useMemo(() => ['created', 'processing'].includes(message.status), []);

  return (
    <div>
      <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        {isError ? (
          <ChatErrorMessage 
            message={message.content} 
            onTryFix={onTryFix}
          />
        ) : (
          <div
            className={`max-w-[80%] rounded-xl p-4 ${
              isUser
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-white border border-gray-100 shadow-sm'
            }`}
          >
            <TypedMessage 
              content={message.content}
              showAnimation={!isUser && isNewMessage}
              className="mb-1"
            />
            <div className={`text-xs ${isUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              {/* {formatTime(message.)} */}
            </div>
          </div>
        )}
      </div>
      <div className={`flex justify-start flex-col my-5 pr-20`}>
        {message.promts.map((currentPromt) => (
          // <div className='mt-2'>{currentPromt.result}</div>
          <TypedMessage
            content={currentPromt.result}
            showAnimation={!isUser && isNewMessage}
            className="mb-1"
          />
        ))}
      </div>
      <div>
        {isLoading && (
          <div>Думаю над вашим запросом ...</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
