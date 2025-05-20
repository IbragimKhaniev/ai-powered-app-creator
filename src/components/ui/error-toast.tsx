
import React from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";

interface ErrorToastProps {
  message?: string;
  onTryFix?: () => void;
}

export const showErrorToast = ({ 
  message = "Приложение имеет ошибки", 
  onTryFix = () => console.log("Try fix clicked") 
}: ErrorToastProps = {}) => {
  toast(
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <span className="font-medium text-base">{message}</span>
        </div>
        <button 
          onClick={() => toast.dismiss()} 
          className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded-full hover:bg-gray-100"
          aria-label="Закрыть"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <Button 
        onClick={(e) => {
          e.preventDefault();
          onTryFix();
          toast.dismiss();
        }}
        className="bg-brand-khaki hover:bg-brand-khaki-dark text-white w-full"
        size="sm"
      >
        Попробовать исправить
      </Button>
    </div>,
    {
      position: "bottom-right",
      duration: Infinity, // Makes the toast stay until manually dismissed
      className: "error-toast-container"
    }
  );
};
