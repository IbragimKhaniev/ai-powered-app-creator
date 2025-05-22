
import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Microchip } from "lucide-react";
import Header from '../Header';
import ChatInput from '../ChatInput';
import ChatMessage from '../ChatMessage';
import { CONSTRUCTOR_TEXT } from '../../constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GetApplicationsApplicationIdMessages200Item } from '@/api/core';

interface ChatPanelProps {
  messages: GetApplicationsApplicationIdMessages200Item[];
  onSendMessage: (message: string) => void;
  onTryFix: () => void;
  isLoading?: boolean;
  selectedModel: string;
  onModelChange: (model: string) => void;
  handleChangeMessageInput: (value: string) => void;
  messageInputValue: string;
  availableModels: string[];
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  onTryFix,
  isLoading = false,
  selectedModel,
  onModelChange,
  handleChangeMessageInput,
  messageInputValue,
  availableModels = []
}) => {
  const [newMessageIds, setNewMessageIds] = useState<Set<string>>(new Set());
  const prevMessagesLengthRef = useRef(messages.length);
  
  useEffect(() => {
    // Check if new messages have been added
    if (messages.length > prevMessagesLengthRef.current) {
      const newMessages = messages.slice(prevMessagesLengthRef.current);
      const newIds = new Set(newMessageIds);
      
      newMessages.forEach(message => {
        newIds.add(message.id);
      });

      setNewMessageIds(newIds);
    }
    
    prevMessagesLengthRef.current = messages.length;
  }, [messages, newMessageIds]);

  const handleModelChange = (value: string) => {
    onModelChange(value);
  };

  // Transform model IDs to display names
  const getModelDisplayName = (modelId: string): string => {
    switch (modelId) {
      case 'gpt-4o-mini': return 'GPT-4o Mini';
      case 'gpt-4o': return 'GPT-4o';
      case 'gpt-4.5-preview': return 'GPT-4.5 Preview';
      default: return modelId;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b flex justify-between items-center bg-white p-4">
        <Header title={CONSTRUCTOR_TEXT.CHAT_WITH_AI} description={CONSTRUCTOR_TEXT.DESCRIBE_APP} showBackButton={true} />
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-background">
        <div className="space-y-4">
          {messages?.map(message => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onTryFix={onTryFix} 
              isNewMessage={newMessageIds.has(message.id)}
            />
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t p-2 bg-white">
        <div className="flex items-center gap-2 mb-2 px-[18px]">
          <Select value={selectedModel} onValueChange={handleModelChange}>
            <SelectTrigger className="h-8 w-[180px]">
              <Microchip className="h-4 w-4 mr-2 text-primary" />
              <SelectValue placeholder="Выберите модель" />
            </SelectTrigger>
            <SelectContent>
              {availableModels.length > 0 ? (
                availableModels.map(model => (
                  <SelectItem key={model} value={model}>
                    {getModelDisplayName(model)}
                  </SelectItem>
                ))
              ) : (
                <>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        
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
