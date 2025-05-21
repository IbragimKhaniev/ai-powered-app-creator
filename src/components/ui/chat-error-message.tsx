
import React from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ChatErrorMessageProps {
  message?: string;
  onTryFix?: () => void;
}

const ChatErrorMessage = ({ 
  message = "Приложение имеет ошибки", 
  onTryFix = () => console.log("Try fix clicked") 
}: ChatErrorMessageProps = {}) => {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[80%] rounded-xl p-4 bg-white border border-red-100 shadow-sm">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <span className="font-medium text-base">{message}</span>
      </div>
      <Button 
        onClick={(e) => {
          e.preventDefault();
          onTryFix();
        }}
        className="bg-brand-purple hover:bg-purple-700 text-white w-full rounded-full"
        size="sm"
      >
        Попробовать исправить
      </Button>
    </div>
  );
};

export default ChatErrorMessage;
