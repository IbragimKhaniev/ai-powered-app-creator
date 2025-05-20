
import React from 'react';
import { Avatar } from 'antd';
import { cn } from '@/lib/utils';

interface ProjectPreviewProps {
  imageUrl: string;
  userName: string;
  userAvatar?: string;
  projectName: string;
  remixCount: number;
  onClick?: () => void;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = React.memo(({
  imageUrl,
  userName,
  userAvatar,
  projectName,
  remixCount,
  onClick
}) => {
  return (
    <div 
      className={cn(
        "flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow",
        "bg-white cursor-pointer h-full"
      )}
      onClick={onClick}
    >
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={projectName}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex items-center p-3 border-t">
        <Avatar src={userAvatar} size="small" className="mr-2" />
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium truncate">{userName}</p>
        </div>
        <div className="text-xs text-gray-500">
          {remixCount} Remixes
        </div>
      </div>
    </div>
  );
});

ProjectPreview.displayName = 'ProjectPreview';

export default ProjectPreview;
