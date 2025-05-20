
import React from 'react';
import { Card } from "@/components/ui/card";
import { CONSTRUCTOR_TEXT } from '../../constants';

const AppPreviewCard: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-full max-w-md p-8 text-center shadow-card">
        <h3 className="text-xl font-medium mb-4">{CONSTRUCTOR_TEXT.APP_PREVIEW_TITLE}</h3>
        <p className="text-muted-foreground mb-6">
          {CONSTRUCTOR_TEXT.APP_PREVIEW_DESCRIPTION}
        </p>
        <div className="p-8 border border-dashed rounded-lg border-gray-200">
          <p className="text-muted-foreground">{CONSTRUCTOR_TEXT.PREVIEW_AREA}</p>
        </div>
      </Card>
    </div>
  );
};

export default AppPreviewCard;
