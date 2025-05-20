
import React from 'react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ label, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 py-2 px-4 bg-white rounded-full',
        'border border-gray-200 shadow-sm hover:shadow-md transition-shadow',
        'text-sm font-medium'
      )}
    >
      {icon && <span>{icon}</span>}
      <span>{label}</span>
    </button>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
