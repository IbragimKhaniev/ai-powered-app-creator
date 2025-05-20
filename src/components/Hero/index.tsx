
import React, { useMemo, useCallback } from 'react';
import { SITE_CONSTANTS, PROJECT_TYPES } from '@/config/constants';
import PromptInput from './PromptInput';
import ProjectCard from './ProjectCard';

const Hero: React.FC = React.memo(() => {
  const handlePromptSubmit = useCallback((prompt: string, isPublic: boolean) => {
    console.log('Prompt submitted:', prompt, 'Public:', isPublic);
    // Handle prompt submission logic here
  }, []);

  const heroTitleWithLogo = useMemo(() => {
    return (
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
        {SITE_CONSTANTS.HERO_TITLE}{' '}
        <span className="inline-flex items-center">
          <span className="text-brand-red mr-1">❤</span> 
          {SITE_CONSTANTS.SITE_NAME}
        </span>
      </h1>
    );
  }, []);

  return (
    <section className="pt-24 pb-12 relative overflow-hidden bg-hero-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {heroTitleWithLogo}
          <p className="text-lg text-center text-gray-700 mb-8">
            {SITE_CONSTANTS.HERO_SUBTITLE}
          </p>
          
          <div className="mb-8">
            <PromptInput onSubmit={handlePromptSubmit} />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {PROJECT_TYPES.map((project) => (
              <ProjectCard 
                key={project.id}
                label={project.label}
                onClick={() => console.log('Selected project:', project.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
