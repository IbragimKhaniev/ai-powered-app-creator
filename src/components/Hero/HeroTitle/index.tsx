
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';

const HeroTitle: React.FC = React.memo(() => {
  return (
    <div className="relative">
      {/* Glowing text effect */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-6 leading-tight tracking-tight relative">
        {SITE_CONSTANTS.HERO_TITLE}
      </h1>
      {/* Subtle glow behind text */}
      <div className="absolute inset-0 text-5xl md:text-6xl lg:text-7xl font-extralight text-cyan-400/20 blur-sm mb-6 leading-tight tracking-tight pointer-events-none">
        {SITE_CONSTANTS.HERO_TITLE}
      </div>
    </div>
  );
});

HeroTitle.displayName = 'HeroTitle';

export default HeroTitle;
