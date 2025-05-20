
import React from 'react';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CONSTRUCTOR_TEXT } from '../../constants';

const AppPreviewCard: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-full max-w-lg p-6 text-center shadow-lg border border-primary/10 bg-white/95 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent pointer-events-none" />
        
        <h3 className="text-xl font-medium mb-4 text-primary">{CONSTRUCTOR_TEXT.APP_PREVIEW_TITLE}</h3>
        <p className="text-muted-foreground mb-6">
          {CONSTRUCTOR_TEXT.APP_PREVIEW_DESCRIPTION}
        </p>
        
        {/* App Skeleton UI */}
        <div className="p-4 border rounded-lg border-gray-200 bg-gray-50/70 shadow-inner">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-32" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
          
          {/* Content skeletons */}
          <div className="space-y-4">
            {/* Navigation */}
            <div className="flex space-x-2 mb-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
            
            {/* Main content area */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 space-y-3">
                <Skeleton className="h-24 w-full" />
                <div className="grid grid-cols-2 gap-3">
                  <Skeleton className="h-28 w-full" />
                  <Skeleton className="h-28 w-full" />
                </div>
                <Skeleton className="h-16 w-full" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
            
            {/* Footer area */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>
          </div>
        </div>
        
        {/* Small hint below the preview */}
        <p className="text-xs text-muted-foreground mt-4 opacity-70">
          {CONSTRUCTOR_TEXT.PREVIEW_AREA}
        </p>
      </Card>
    </div>
  );
};

export default AppPreviewCard;
