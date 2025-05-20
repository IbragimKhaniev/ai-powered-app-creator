
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const AppPreviewCard: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Skeleton UI wrapper - fills the entire preview window */}
      <div className="flex-1 p-4 bg-gray-50/80 relative">
        {/* App skeleton layout */}
        <div className="h-full grid grid-rows-[auto_1fr_auto] gap-4">
          {/* Header skeleton */}
          <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
            <Skeleton className="h-8 w-32" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
          
          {/* Main content area */}
          <div className="grid grid-cols-4 gap-4">
            {/* Sidebar */}
            <div className="col-span-1 bg-white rounded-lg shadow-sm p-4 space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-2/3" />
            </div>
            
            {/* Main content */}
            <div className="col-span-3 bg-white rounded-lg shadow-sm p-4 space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-3/4" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
              <Skeleton className="h-24 w-full" />
              <div className="grid grid-cols-3 gap-3">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPreviewCard;
