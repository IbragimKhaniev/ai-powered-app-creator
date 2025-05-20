
import React, { useState, useCallback } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { CONSTRUCTOR_CONSTANTS } from '../../constants';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = React.memo(({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
  }, []);
  
  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim() === '') return;
    
    onSendMessage(inputMessage);
    setInputMessage('');
  }, [inputMessage, onSendMessage]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <div className="relative">
      <Textarea
        placeholder={CONSTRUCTOR_CONSTANTS.INPUT_PLACEHOLDER}
        value={inputMessage}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="min-h-[80px] resize-none pr-12"
      />
      <Button 
        onClick={handleSendMessage} 
        className="absolute bottom-3 right-3 rounded-full w-8 h-8 p-0 flex items-center justify-center"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';

export default ChatInput;
