
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
    <section className="min-h-screen flex flex-col justify-center relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated geometric background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating dots */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-80"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-70" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '3s' }}></div>
        
        {/* Moving lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent opacity-60 animate-[slide-in-right_8s_ease-in-out_infinite]"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent opacity-40 animate-[slide-in-right_12s_ease-in-out_infinite_reverse]" style={{ animationDelay: '4s' }}></div>
        
        {/* Vertical moving lines */}
        <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent opacity-30 animate-[slide-up_10s_ease-in-out_infinite]"></div>
        <div className="absolute right-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-400/20 to-transparent opacity-35 animate-[slide-up_15s_ease-in-out_infinite_reverse]" style={{ animationDelay: '6s' }}></div>
      </div>

      <div className="container mx-auto px-4 flex-1 flex flex-col justify-center relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <HeroTitle />
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
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
          className="text-slate-400 hover:text-blue-400 transition-all duration-300 hover:transform hover:translate-y-1"
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
