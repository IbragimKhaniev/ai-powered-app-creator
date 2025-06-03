
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';

const HeroTitle: React.FC = React.memo(() => {
  return (
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extralight text-gray-900 mb-6 leading-tight tracking-tight">
      {SITE_CONSTANTS.HERO_TITLE}
    </h1>
  );
});

HeroTitle.displayName = 'HeroTitle';

export default HeroTitle;
