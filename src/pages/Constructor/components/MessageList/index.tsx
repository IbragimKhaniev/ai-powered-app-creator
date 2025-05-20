
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from '../../types';
import MessageBubble from '../MessageBubble';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = React.memo(({ messages }) => {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
    </ScrollArea>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
