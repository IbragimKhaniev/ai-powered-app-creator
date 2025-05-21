
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';

const HeroTitle: React.FC = React.memo(() => {
  return (
    <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
      {SITE_CONSTANTS.HERO_TITLE}
    </h1>
  );
});

HeroTitle.displayName = 'HeroTitle';

export default HeroTitle;
