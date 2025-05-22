
import React, { useState, useEffect, useMemo } from 'react';
import { Message } from '../../types';
import ChatErrorMessage from '@/components/ui/chat-error-message';
import { formatTime } from '../../utils/formatUtils';
import TypedMessage from '../TypedMessage';
import { GetApplicationsApplicationIdMessages200Item } from '@/api/core';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ChatMessageProps {
  message: GetApplicationsApplicationIdMessages200Item;
  onTryFix?: () => void;
  isNewMessage?: boolean;
  additionalContent?: string; // New prop for additional collapsible content
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onTryFix,
  isNewMessage = false,
  additionalContent
}) => {
  const isError = useMemo(() => message.status === 'error', []);
  const isUser = useMemo(() => message.role === 'user', []);
  const isLoading = useMemo(() => ['created', 'processing'].includes(message.status), []);
  const [isOpen, setIsOpen] = useState(false);

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
            
            {additionalContent && (
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="mt-2 pt-2 border-t border-gray-100"
              >
                <div className="flex items-center">
                  <CollapsibleTrigger className="flex items-center text-xs text-blue-500 hover:text-blue-700">
                    {isOpen ? (
                      <>
                        <ChevronUp className="h-3 w-3 mr-1" />
                        Скрыть детали
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 mr-1" />
                        Показать детали
                      </>
                    )}
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-2 text-sm text-gray-700">
                  {additionalContent}
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        )}
      </div>
      <div className={`flex justify-start flex-col my-5 pr-20`}>
        {message.promts?.map((currentPromt, index) => (
          <TypedMessage
            key={index}
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
