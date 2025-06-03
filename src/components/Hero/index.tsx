
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
    <section className="min-h-screen flex flex-col justify-center relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Subtle geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-slate-200 to-transparent opacity-40"></div>
        <div className="absolute top-1/3 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-slate-200 to-transparent opacity-30"></div>
        <div className="absolute bottom-1/3 left-1/2 w-px h-20 bg-gradient-to-b from-transparent via-slate-200 to-transparent opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 flex-1 flex flex-col justify-center relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <HeroTitle />
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
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
          className="text-slate-400 hover:text-slate-600 transition-all duration-300 hover:transform hover:translate-y-1"
          aria-label="Прокрутить вниз"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
