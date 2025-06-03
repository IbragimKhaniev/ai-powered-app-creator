
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';

const HeroTitle: React.FC = React.memo(() => {
  return (
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-white mb-8 leading-tight tracking-tight">
      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
        {SITE_CONSTANTS.HERO_TITLE}
      </span>
    </h1>
  );
});

HeroTitle.displayName = 'HeroTitle';

export default HeroTitle;
