
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Microchip } from "lucide-react";
import Header from '../Header';
import ChatInput from '../ChatInput';
import ChatMessage from '../ChatMessage';
import ChatErrorMessage from '@/components/ui/chat-error-message';
import { CONSTRUCTOR_TEXT } from '../../constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GetApplicationsApplicationIdMessages200Item } from '@/api/core';

interface ChatPanelProps {
  messages: GetApplicationsApplicationIdMessages200Item[];
  onSendMessage: (message: string) => void;
  onTryFix: () => void;
  isLoading?: boolean;
  handleChangeMessageInput: (value: string) => void;
  messageInputValue: string;
  deployingError?: string | null;
  onTryFixDeployError?: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  onTryFix,
  isLoading = false,
  handleChangeMessageInput,
  messageInputValue,
  deployingError,
  onTryFixDeployError
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b flex justify-between items-center bg-white p-4">
        <Header title={CONSTRUCTOR_TEXT.CHAT_WITH_AI} description={CONSTRUCTOR_TEXT.DESCRIBE_APP} showBackButton={true} />
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-background">
        <div className="space-y-4">
          {messages?.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onTryFix={onTryFix}
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

                disabled={isLoading}
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
