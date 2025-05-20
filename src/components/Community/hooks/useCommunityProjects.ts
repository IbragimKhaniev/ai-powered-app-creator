
import { useCallback, useMemo } from 'react';

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

export const useCommunityProjects = () => {
  const projects = useMemo(() => MOCK_PROJECTS, []);

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

  return {
    projects,
    handleViewProject,
    handleViewAll,
    handleShowMore
  };
};
