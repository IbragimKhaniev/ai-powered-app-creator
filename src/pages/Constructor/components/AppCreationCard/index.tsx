
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { CONSTRUCTOR_TEXT } from '../../constants';

interface AppCreationCardProps {
  onStartCreation: () => void;
}

const AppCreationCard: React.FC<AppCreationCardProps> = ({ onStartCreation }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-full max-w-md p-8 text-center shadow-card">
        <h3 className="text-xl font-medium mb-4">{CONSTRUCTOR_TEXT.CREATE_APP}</h3>
        <div className="flex justify-center mb-6">
          <MessageSquarePlus className="h-16 w-16 text-brand-khaki-light" />
        </div>
        <p className="text-muted-foreground mb-6">
          {CONSTRUCTOR_TEXT.CREATE_APP_DESCRIPTION}
        </p>
        <Button 
          onClick={onStartCreation}
          className="w-full rounded-full bg-brand-khaki hover:bg-brand-khaki-dark"
        >
          {CONSTRUCTOR_TEXT.START_CREATION}
        </Button>
      </Card>
    </div>
  );
};

export default AppCreationCard;
