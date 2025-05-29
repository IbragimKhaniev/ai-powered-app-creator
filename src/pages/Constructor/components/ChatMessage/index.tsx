
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Message } from '../../types';
import ChatErrorMessage from '@/components/ui/chat-error-message';
import { formatTime } from '../../utils/formatUtils';
import TypedMessage from '../TypedMessage';
import { GetApplicationsApplicationIdMessages200Item, GetApplicationsApplicationIdMessages200ItemPromtsItem } from '@/api/core';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import Promt from '../Promt';

interface ChatMessageProps {
  message: GetApplicationsApplicationIdMessages200Item;
  applicationId: string;
  onTryFix?: (id: string) => void;
  additionalContent?: string; // New prop for additional collapsible content
  isNewMessage?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  onTryFix,
  additionalContent,
  isNewMessage,
  applicationId
}) => {
  const [promts, setPromts] = useState<GetApplicationsApplicationIdMessages200ItemPromtsItem[]>(message?.promts || []);
  const [isOnlineRender, setIsOnlineRender] = useState(false);

  const isError = useMemo(() => message.status === 'error', [message.status]);
  const isUser = useMemo(() => message.role === 'user', [message.role]);
  const isLoading = useMemo(() => ['created', 'processing'].includes(message.status), [message.status]);
  const isDeploying = useMemo(() => ['deploying'].includes(message.status), [message.status]);
  const [isOpen, setIsOpen] = useState(false);

  const onClickTryFix = useCallback(() => {
    if (onTryFix) {
      onTryFix(message.id);
    }
  }, [message.id, onTryFix]);

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
    <div key={message.id}>
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={cn(
            'rounded-xl p-4',
            {
              "w-[60%]": additionalContent,
              "max-w-[80%]": !additionalContent,
              "bg-primary text-primary-foreground shadow-sm": isUser,
              "bg-white border border-gray-100 shadow-sm": !isUser,
              "bg-destructive border-destructive-100": isError,
              "animate-pulse": isLoading,
            }
          )}
        >
          <TypedMessage 
            content={message.content}
            showAnimation={false}
            className="mb-1"
          />
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
      </div>
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} p-2`}>
        {isNewMessage && isError && (
          <div>
            <Button onClick={onClickTryFix}>
              Попробовать исправить
            </Button>
          </div>
        )}
      </div>
      <div className={`flex justify-start flex-col my-5 pr-20`}>
        {message.promts?.map((currentPromt, index) => (
          <Promt
            key={index}
            data={currentPromt}
            messageId={message.id}
            applicationId={applicationId}
            showAnimation={isOnlineRender && isNewMessage && index === message.promts.length - 1}
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
        {isNewMessage && isError && (
          <ChatErrorMessage
            message={`Ошибка при общении с AI: 'Неизвестная ошибка'}`}
            onTryFix={onClickTryFix}
            disabled={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
