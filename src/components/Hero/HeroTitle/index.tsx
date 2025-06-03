
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';

const HeroTitle: React.FC = React.memo(() => {
  return (
    <div className="text-center mb-20">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-8">
        <span className="block mb-2">Create stunning</span>
        <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-2">
          applications
        </span>
        <span className="block">in seconds</span>
      </h1>
      
      <div className="flex justify-center mb-8">
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400/80 to-transparent"></div>
      </div>
      
      <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto leading-relaxed">
        Transform your ideas into reality with AI-powered development. 
        Build, deploy, and scale applications effortlessly.
      </p>
    </div>
  );
});

HeroTitle.displayName = 'HeroTitle';

export default HeroTitle;
