
import React from 'react';
import { Card } from "@/components/ui/card";
import { CONSTRUCTOR_CONSTANTS } from '../../constants';

const PreviewContent: React.FC = React.memo(() => {
  return (
    <div className="flex-1 overflow-auto p-6 bg-gray-50">
      <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-md p-8 text-center">
          <h3 className="text-xl font-medium mb-4">
            {CONSTRUCTOR_CONSTANTS.PREVIEW_CONTENT.TITLE}
          </h3>
          <p className="text-muted-foreground mb-6">
            {CONSTRUCTOR_CONSTANTS.PREVIEW_CONTENT.DESCRIPTION}
          </p>
          <div className="p-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">
              {CONSTRUCTOR_CONSTANTS.PREVIEW_CONTENT.AREA_LABEL}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
});

PreviewContent.displayName = 'PreviewContent';

export default PreviewContent;
