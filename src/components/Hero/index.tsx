
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
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-hero-gradient">
      <div className="container mx-auto px-4 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <HeroTitle />
          <p className="text-lg text-center text-gray-700 mb-8">
            {SITE_CONSTANTS.HERO_SUBTITLE}
          </p>

          <div className="mb-8">
            <PromptInput onSubmit={handlePromptSubmit} />
          </div>
        </div>
      </div>

      {/* Анимированная стрелка для скроллинга */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToNextSection}
          className="text-gray-600 hover:text-gray-900 transition-colors duration-300"
          aria-label="Прокрутить вниз"
        >
          <ChevronDown className="h-10 w-10 animate-bounce" />
        </button>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
