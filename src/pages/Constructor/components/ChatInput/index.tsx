
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, LoaderCircle } from "lucide-react";
import { CONSTRUCTOR_TEXT } from '../../constants';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '' || isLoading) return;
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <div className="border-t p-4 bg-white">
      <div className="relative">
        <Textarea
          placeholder={CONSTRUCTOR_TEXT.ENTER_MESSAGE}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          className={`min-h-[80px] resize-none pr-12 rounded-xl border-gray-200 focus:border-primary shadow-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={isLoading}
          className={`absolute bottom-3 right-3 rounded-full w-8 h-8 p-0 flex items-center justify-center bg-brand-khaki hover:bg-brand-khaki-dark ${isLoading ? 'opacity-70' : ''}`}
        >
          {isLoading ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
