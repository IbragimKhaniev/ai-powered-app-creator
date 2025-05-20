
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader } from "lucide-react";
import { CONSTRUCTOR_TEXT } from '../../constants';

interface LoadingStateProps {
  loadingProgress: number;
}

const LoadingState: React.FC<LoadingStateProps> = ({ loadingProgress }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Card className="w-full max-w-md p-8 text-center shadow-card">
        <h3 className="text-xl font-medium mb-4">{CONSTRUCTOR_TEXT.APP_DEPLOYING}</h3>
        <div className="flex justify-center mb-6">
          <Loader className="h-10 w-10 animate-spin text-blue-500" />
        </div>
        <Progress value={loadingProgress} className="h-2 mb-2" />
        <p className="text-sm text-muted-foreground">{loadingProgress}% {CONSTRUCTOR_TEXT.COMPLETED}</p>
      </Card>
    </div>
  );
};

export default LoadingState;
