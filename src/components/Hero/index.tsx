
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
    <section className="min-h-screen flex flex-col justify-center relative bg-black overflow-hidden">
      {/* Abstract 3D shapes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main floating orb with gradient */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-500/30 via-blue-500/20 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Secondary orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 via-purple-500/15 to-cyan-400/20 rounded-full blur-2xl animate-[pulse_3s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 left-1/5 w-48 h-48 bg-gradient-to-br from-purple-500/25 via-orange-400/15 to-pink-500/20 rounded-full blur-2xl animate-[pulse_4s_ease-in-out_infinite]"></div>
        
        {/* Flowing lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full opacity-30" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.4"/>
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
            <path d="M0,400 Q300,200 600,400 T1200,400" stroke="url(#grad1)" strokeWidth="2" fill="none" className="animate-[draw_8s_ease-in-out_infinite]"/>
            <path d="M0,600 Q400,300 800,600 T1200,200" stroke="url(#grad1)" strokeWidth="1.5" fill="none" className="animate-[draw_10s_ease-in-out_infinite_reverse]"/>
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-orange-400 rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 flex-1 flex flex-col justify-center relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <HeroTitle />
          
          {/* Statistics */}
          <div className="flex justify-center items-center gap-12 mb-12 text-white/60">
            <div className="text-center">
              <div className="text-2xl font-light text-white">+65k</div>
              <div className="text-sm">startups use</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-white">+300k</div>
              <div className="text-sm">downloads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light text-white">+1.5b</div>
              <div className="text-sm">gb data was protected</div>
            </div>
          </div>

          <p className="text-xl text-white/70 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
            {SITE_CONSTANTS.HERO_SUBTITLE}
          </p>

          <div className="mb-12">
            <PromptInput onSubmit={handlePromptSubmit} />
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4 mb-16">
            <button className="bg-black/60 border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              verify you're human
            </button>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300">
              try demo
            </button>
          </div>

          {/* Bottom description */}
          <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
            By partnering with a security provider, a company can significantly enhance the protection of its sensitive data. This includes implementing robust encryption techniques, access controls, and monitoring systems to safeguard against unauthorized access, data breaches, and cyberattacks.
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToNextSection}
          className="text-white/40 hover:text-orange-400 transition-all duration-300 hover:transform hover:translate-y-1"
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
