
import React from 'react';
import ProjectPreview from '../ProjectPreview';

interface Project {
  id: string;
  imageUrl: string;
  userName: string;
  projectName: string;
  remixCount: number;
}

interface ProjectListProps {
  projects: Project[];
  onViewProject: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = React.memo(({
  projects,
  onViewProject
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {projects.map((project) => (
        <ProjectPreview
          key={project.id}
          imageUrl={project.imageUrl}
          userName={project.userName}
          projectName={project.projectName}
          remixCount={project.remixCount}
          onClick={() => onViewProject(project.id)}
        />
      ))}
    </div>
  );
});

ProjectList.displayName = 'ProjectList';

export default ProjectList;
