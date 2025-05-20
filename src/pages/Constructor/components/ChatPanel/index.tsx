
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from '../Header';
import ChatInput from '../ChatInput';
import ChatMessage from '../ChatMessage';
import { Message } from '../../types';
import { CONSTRUCTOR_TEXT } from '../../constants';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onTryFix: () => void;
  isLoading?: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ 
  messages, 
  onSendMessage, 
  onTryFix,
  isLoading = false
}) => {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b flex justify-between items-center bg-white p-4">
        <Header 
          title={CONSTRUCTOR_TEXT.CHAT_WITH_AI} 
          description={CONSTRUCTOR_TEXT.DESCRIBE_APP} 
          showBackButton={true}
        />
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-background">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onTryFix={onTryFix} 
            />
          ))}
        </div>
      </ScrollArea>
      
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatPanel;
