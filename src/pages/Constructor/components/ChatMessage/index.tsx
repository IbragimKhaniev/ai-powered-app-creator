
import React, { useState, useEffect, useMemo } from 'react';
import { Message } from '../../types';
import ChatErrorMessage from '@/components/ui/chat-error-message';
import { formatTime } from '../../utils/formatUtils';
import TypedMessage from '../TypedMessage';
import { GetApplicationsApplicationIdMessages200Item, GetApplicationsApplicationIdMessages200ItemPromtsItem } from '@/api/core';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ChatMessageProps {
  message: GetApplicationsApplicationIdMessages200Item;
  onTryFix?: () => void;
  additionalContent?: string; // New prop for additional collapsible content
  isNewMessage?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onTryFix,
  additionalContent,
  isNewMessage
}) => {
  const [promts, setPromts] = useState<GetApplicationsApplicationIdMessages200ItemPromtsItem[]>(message?.promts || []);
  const [isOnlineRender, setIsOnlineRender] = useState(false);

  const isError = useMemo(() => message.status === 'error', []);
  const isUser = useMemo(() => message.role === 'user', []);
  const isLoading = useMemo(() => ['created', 'processing'].includes(message.status), [message.status]);
  const isDeploying = useMemo(() => ['deploying'].includes(message.status), [message.status]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!message?.promts.length) return;

    setPromts(message.promts);
  }, [message.promts, promts.length]);

  useEffect(() => {
    if (promts.length && message?.promts?.length !== promts.length) {
      setIsOnlineRender(true);
    }
  }, [message?.promts?.length, promts.length]);

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
            className={`rounded-xl p-4 ${
              additionalContent ? 'w-[60%]' : 'max-w-[80%]'
            } ${
              isUser
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-white border border-gray-100 shadow-sm'
            }`}
          >
            <TypedMessage 
              content={message.content}
              showAnimation={false}
              className="mb-1"
            />
            {/* <div className={`text-xs ${isUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              {formatTime(message.)}
            </div> */}

            {additionalContent && (
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="mt-2 pt-2"
              >
                <div className="flex items-center">
                  <CollapsibleTrigger className="flex items-center text-xs">
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
                <CollapsibleContent className="mt-2 text-sm">
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
            showAnimation={isOnlineRender && isNewMessage && index === message.promts.length - 1}
            className="mb-1"
          />
        ))}
      </div>
      <div>
        {isLoading && (
          <TypedMessage 
            content="Думаю над вашим запросом ..."
            showAnimation
            className="mb-1"
            showPulseAlways
          />
        )}
        {isDeploying && (
          <TypedMessage 
            content="Деплою приложение ..."
            showAnimation
            className="mb-1"
            showPulseAlways
          />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
