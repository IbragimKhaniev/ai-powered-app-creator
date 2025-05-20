
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';

const HeroTitle: React.FC = React.memo(() => {
  return (
    <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
      {SITE_CONSTANTS.HERO_TITLE}{' '}
      <span className="inline-flex items-center">
        <span className="text-brand-red mr-1">❤</span> 
        {SITE_CONSTANTS.SITE_NAME}
      </span>
    </h1>
  );
});

HeroTitle.displayName = 'HeroTitle';

export default HeroTitle;
