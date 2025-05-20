
import React, { useCallback } from 'react';
import { Button } from 'antd';
import { COMMUNITY_SECTION } from '@/config/constants';
import ProjectPreview from './ProjectPreview';

// Mock data for community projects
const MOCK_PROJECTS = [
  {
    id: '1',
    imageUrl: 'https://picsum.photos/id/1/400/300',
    userName: 'user-service',
    projectName: 'User Service',
    remixCount: 637,
  },
  {
    id: '2',
    imageUrl: 'https://picsum.photos/id/2/400/300',
    userName: 'tableone-fundraise-hub',
    projectName: 'Fundraise Hub',
    remixCount: 2,
  },
  {
    id: '3',
    imageUrl: 'https://picsum.photos/id/3/400/300',
    userName: 'trailguidecollab',
    projectName: 'Trail Guide',
    remixCount: 438,
  },
  {
    id: '4',
    imageUrl: 'https://picsum.photos/id/4/400/300',
    userName: 'undigrid',
    projectName: 'Grid System',
    remixCount: 1,
  },
  {
    id: '5',
    imageUrl: 'https://picsum.photos/id/5/400/300',
    userName: 'write-ai-integration',
    projectName: 'Write AI',
    remixCount: 2473,
  },
  {
    id: '6',
    imageUrl: 'https://picsum.photos/id/6/400/300',
    userName: 'patrick-boghosian-ring-sizer',
    projectName: 'Ring Sizer',
    remixCount: 261,
  },
];

const Community: React.FC = React.memo(() => {
  const handleViewProject = useCallback((projectId: string) => {
    console.log('View project:', projectId);
    // Handle project view logic here
  }, []);

  const handleViewAll = useCallback(() => {
    console.log('View all projects');
    // Handle view all logic here
  }, []);

  const handleShowMore = useCallback(() => {
    console.log('Show more projects');
    // Handle show more logic here
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{COMMUNITY_SECTION.TITLE}</h2>
          <Button type="link" onClick={handleViewAll}>{COMMUNITY_SECTION.VIEW_ALL}</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_PROJECTS.map((project) => (
            <ProjectPreview
              key={project.id}
              imageUrl={project.imageUrl}
              userName={project.userName}
              projectName={project.projectName}
              remixCount={project.remixCount}
              onClick={() => handleViewProject(project.id)}
            />
          ))}
        </div>
        
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
