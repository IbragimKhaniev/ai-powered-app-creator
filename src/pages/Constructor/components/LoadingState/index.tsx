
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LoaderCircle } from "lucide-react";
import { CONSTRUCTOR_TEXT } from '../../constants';

interface LoadingStateProps {
  loadingProgress: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ loadingProgress }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Card className="w-full max-w-md p-8 text-center shadow-lg border border-primary/10 bg-white/95 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent pointer-events-none" />
        
        <h3 className="text-xl font-medium mb-4 text-primary">{CONSTRUCTOR_TEXT.APP_DEPLOYING}</h3>
        
        <div className="flex justify-center mb-6 relative">
          <div className="absolute -inset-2 bg-blue-100/30 rounded-full blur-md animate-pulse" />
          <LoaderCircle className="h-12 w-12 animate-spin text-primary relative" />
        </div>
        
        <div className="space-y-3">
          <Progress 
            value={loadingProgress} 
            className="h-2.5 rounded-full overflow-hidden bg-blue-100" 
          />
          <p className="text-sm font-medium text-primary/80">
            <span className="text-lg text-primary">{loadingProgress}%</span> {CONSTRUCTOR_TEXT.COMPLETED}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default LoadingState;
