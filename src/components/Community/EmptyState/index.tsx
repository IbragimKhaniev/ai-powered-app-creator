
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

interface EmptyStateProps {
  onCreateApp?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = React.memo(({ onCreateApp }) => {
  return (
    <Card className="border-dashed border-2 border-gray-300">
      <CardContent className="flex flex-col items-center justify-center py-16 px-8">
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-gray-400" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Plus className="h-4 w-4 text-white" />
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Пока что здесь пусто
        </h3>
        <p className="text-gray-600 text-center mb-6 max-w-md">
          Станьте первым, кто поделится своим удивительным приложением с сообществом!
        </p>
        
        {onCreateApp && (
          <Button onClick={onCreateApp} className="gap-2">
            <Plus className="h-4 w-4" />
            Создать первое приложение
          </Button>
        )}
      </CardContent>
    </Card>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
