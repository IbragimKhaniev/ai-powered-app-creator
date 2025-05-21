
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from '../Header';
import ChatInput from '../ChatInput';
import ChatMessage from '../ChatMessage';
import { Message } from '../../types';
import { CONSTRUCTOR_TEXT } from '../../constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Microchip } from "lucide-react";

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onTryFix: () => void;
  isLoading?: boolean;
}

const AI_MODELS = [{
  id: 'gpt-4o',
  name: 'GPT-4o'
}, {
  id: 'gpt-4o-mini',
  name: 'GPT-4o Mini'
}, {
  id: 'gpt-4.5-preview',
  name: 'GPT-4.5 Preview'
}];

const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  onSendMessage,
  onTryFix,
  isLoading = false
}) => {
  const [selectedModel, setSelectedModel] = React.useState('gpt-4o');
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };

  return <div className="flex h-full flex-col">
      <div className="border-b flex justify-between items-center py-3 px-4">
        <Header 
          title="Конструктор AI" 
          showBackButton={true} 
          compact={true} 
        />
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-background">
        <div className="space-y-4">
          {messages.map(message => <ChatMessage key={message.id} message={message} onTryFix={onTryFix} />)}
        </div>
      </ScrollArea>
      
      <div className="border-t p-2 bg-white">
        <div className="flex items-center gap-2 mb-2 px-[18px]">
          
          <Select value={selectedModel} onValueChange={handleModelChange}>
            <SelectTrigger className="h-8 w-[180px]">
              <SelectValue placeholder="Выберите модель" />
            </SelectTrigger>
            <SelectContent>
              {AI_MODELS.map(model => <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>;
};

export default ChatPanel;
