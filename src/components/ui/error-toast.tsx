
import React from 'react';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorToastProps {
  message?: string;
  onTryFix?: () => void;
}

export const showErrorToast = ({ 
  message = "Приложение имеет ошибки", 
  onTryFix = () => console.log("Try fix clicked") 
}: ErrorToastProps = {}) => {
  toast(
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <span className="font-medium">{message}</span>
      </div>
      <Button 
        onClick={(e) => {
          e.preventDefault();
          onTryFix();
          toast.dismiss();
        }}
        className="bg-orange-500 hover:bg-orange-600 text-white"
        size="sm"
      >
        Попробовать исправить
      </Button>
    </div>,
    {
      position: "bottom-right",
      duration: 5000,
      className: "error-toast-container"
    }
  );
};
