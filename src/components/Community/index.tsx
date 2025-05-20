
import React from 'react';
import { Button } from '@/components/ui/button';
import { COMMUNITY_SECTION } from '@/config/constants';
import ProjectList from './ProjectList';
import { useCommunityProjects } from './hooks/useCommunityProjects';

const Community: React.FC = React.memo(() => {
  const {
    projects,
    handleViewProject,
    handleViewAll,
    handleShowMore
  } = useCommunityProjects();

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{COMMUNITY_SECTION.TITLE}</h2>
          <Button 
            variant="ghost" 
            onClick={handleViewAll}
          >
            {COMMUNITY_SECTION.VIEW_ALL}
          </Button>
        </div>
        
        <ProjectList 
          projects={projects} 
          onViewProject={handleViewProject}
        />
        
        <div className="flex justify-center mt-8">
          <Button onClick={handleShowMore}>
            {COMMUNITY_SECTION.SHOW_MORE}
          </Button>
        </div>
      </div>
    </section>
  );
});

Community.displayName = 'Community';

export default Community;
