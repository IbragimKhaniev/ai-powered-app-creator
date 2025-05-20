
import React from 'react';
import { Message } from '../../types';
import MessageList from '../MessageList';
import ChatInput from '../ChatInput';
import { CONSTRUCTOR_CONSTANTS } from '../../constants';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ChatPanel: React.FC<ChatPanelProps> = React.memo(({ messages, onSendMessage }) => {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <h2 className="text-xl font-bold">{CONSTRUCTOR_CONSTANTS.PAGE_TITLE}</h2>
        <p className="text-sm text-muted-foreground">{CONSTRUCTOR_CONSTANTS.PAGE_DESCRIPTION}</p>
      </div>
      
      <MessageList messages={messages} />
      
      <div className="border-t p-4">
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
});

ChatPanel.displayName = 'ChatPanel';

export default ChatPanel;
