
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';

const HeroTitle: React.FC = React.memo(() => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white leading-tight tracking-wide">
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          {SITE_CONSTANTS.HERO_TITLE}
        </span>
      </h1>
      <div className="mt-4 flex justify-center">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"></div>
      </div>
    </div>
  );
});

HeroTitle.displayName = 'HeroTitle';

export default HeroTitle;
