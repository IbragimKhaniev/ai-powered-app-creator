
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';

const HeroTitle: React.FC = React.memo(() => {
  return (
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-slate-900 mb-8 leading-tight tracking-tight">
      <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
        {SITE_CONSTANTS.HERO_TITLE}
      </span>
    </h1>
  );
});

HeroTitle.displayName = 'HeroTitle';

export default HeroTitle;
