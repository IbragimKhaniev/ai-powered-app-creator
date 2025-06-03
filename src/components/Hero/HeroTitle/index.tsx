
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';

const HeroTitle: React.FC = React.memo(() => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-extralight text-white leading-tight tracking-wide mb-8">
        <span className="block">protect</span>
        <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
          your
        </span>
        <span className="block">data</span>
      </h1>
      
      <div className="flex justify-center mb-8">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"></div>
      </div>
      
      <p className="text-white/60 text-lg font-light max-w-md mx-auto">
        we can guarding your data with utmost care, empowering you with privacy everywhere
      </p>
    </div>
  );
});

HeroTitle.displayName = 'HeroTitle';

export default HeroTitle;
