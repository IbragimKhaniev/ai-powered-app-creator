
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Microchip } from "lucide-react";
import Header from '../Header';
import ChatInput from '../ChatInput';
import ChatMessage from '../ChatMessage';
import ChatErrorMessage from '@/components/ui/chat-error-message';
import { CONSTRUCTOR_TEXT } from '../../constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GetApplicationsApplicationIdMessages200Item, usePostApplicationsApplicationIdMessagesMessageIdRetry } from '@/api/core';
import { ExtendedApplicationData } from '../../types';

interface ChatPanelProps {
  messages: GetApplicationsApplicationIdMessages200Item[];
  onSendMessage: (message: string) => void;
  application?: ExtendedApplicationData;
  isLoading?: boolean;
  isDeploying?: boolean;
  handleChangeMessageInput: (value: string) => void;
  messageInputValue: string;
  deployingError?: string | null;
  onTryFixDeployError?: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  application,
  messages,
  onSendMessage,
  isLoading = false,
  isDeploying,
  handleChangeMessageInput,
  messageInputValue,
  deployingError,
  onTryFixDeployError
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { mutate: retryMessage } = usePostApplicationsApplicationIdMessagesMessageIdRetry();

  const handleTryFixAIError = useCallback((id: string) => {
    if (!application?._id) return;

    retryMessage({
      applicationId: application._id,
      messageId: id,
    });
  }, [application?._id, retryMessage]);

  useEffect(() => {
    if (messages) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b flex justify-between items-center bg-white p-4">
        <Header title={application?.name} description={CONSTRUCTOR_TEXT.DESCRIBE_APP} showBackButton={true} />
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-background">
        <div className="space-y-4">
          {messages?.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              applicationId={application?._id}
              onTryFix={handleTryFixAIError}
              additionalContent={message.additionalContent}
              isNewMessage={index === messages.length - 1}
            />
          ))}
          {/* Display deployment error if exists */}
          {deployingError && (
            <div className="mb-4">
              <ChatErrorMessage 
                message={`Ошибка развертывания: ${deployingError.substring(0, 100)}...`} 
                onTryFix={onTryFixDeployError}

                disabled={isDeploying || isLoading}
              />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="border-t p-2 bg-white">
        
        <div className="p-4">
          <ChatInput
            onSendMessage={onSendMessage}
            isLoading={isLoading}
            handleChangeMessageInput={handleChangeMessageInput}
            messageInputValue={messageInputValue}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
