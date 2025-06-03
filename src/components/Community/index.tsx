
import React from 'react';
import { Button } from '@/components/ui/button';
import { COMMUNITY_SECTION } from '@/config/constants';
import ProjectList from './ProjectList';
import EmptyState from './EmptyState';
import { useCommunityProjects } from './hooks/useCommunityProjects';

const Community: React.FC = React.memo(() => {
  const {
    projects,
    handleViewProject,
    handleViewAll,
    handleShowMore,
    handleCreateApp
  } = useCommunityProjects();

  const hasProjects = projects.length > 0;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {COMMUNITY_SECTION.TITLE}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Откройте для себя удивительные приложения, созданные нашим сообществом
          </p>
        </div>
        
        {hasProjects ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-gray-900">Популярные проекты</h3>
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
            
            <div className="flex justify-center mt-12">
              <Button onClick={handleShowMore} size="lg">
                {COMMUNITY_SECTION.SHOW_MORE}
              </Button>
            </div>
          </>
        ) : (
          <EmptyState onCreateApp={handleCreateApp} />
        )}
      </div>
    </section>
  );
});

Community.displayName = 'Community';

export default Community;
