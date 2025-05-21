
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';
import PromptInput from './PromptInput';
import ProjectCardList from './ProjectCardList';
import HeroTitle from './HeroTitle';
import { usePromptSubmit } from './hooks/usePromptSubmit';

const Hero: React.FC = React.memo(() => {
  const { handlePromptSubmit } = usePromptSubmit();

  return (
    <section className="pt-24 pb-12 relative overflow-hidden bg-hero-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <HeroTitle />
          <p className="text-lg text-center text-gray-700 mb-8">
            {SITE_CONSTANTS.HERO_SUBTITLE}
          </p>

          <div className="mb-8">
            <PromptInput onSubmit={handlePromptSubmit} />
          </div>
          
          <ProjectCardList />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
