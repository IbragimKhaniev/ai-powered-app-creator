
import React, { useCallback } from 'react';
import { PROJECT_TYPES } from '@/config/constants';
import ProjectCard from '../ProjectCard';

const ProjectCardList: React.FC = React.memo(() => {
  const handleProjectSelect = useCallback((projectId: string) => {
    console.log('Selected project:', projectId);
    // Handle project selection logic here
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {PROJECT_TYPES.map((project) => (
        <ProjectCard 
          key={project.id}
          label={project.label}
          onClick={() => handleProjectSelect(project.id)}
        />
      ))}
    </div>
  );
});

ProjectCardList.displayName = 'ProjectCardList';

export default ProjectCardList;
