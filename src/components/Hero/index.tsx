
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';
import PromptInput from './PromptInput';
import HeroTitle from './HeroTitle';
import { usePromptSubmit } from './hooks/usePromptSubmit';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = React.memo(() => {
  const { handlePromptSubmit } = usePromptSubmit();

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative bg-white">
      <div className="container mx-auto px-4 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <HeroTitle />
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {SITE_CONSTANTS.HERO_SUBTITLE}
          </p>

          <div className="mb-8 max-w-2xl mx-auto">
            <PromptInput onSubmit={handlePromptSubmit} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToNextSection}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Прокрутить вниз"
        >
          <ChevronDown className="h-12 w-12" />
        </button>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
