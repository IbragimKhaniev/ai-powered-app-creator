
import React from 'react';
import { SITE_CONSTANTS } from '@/config/constants';
import PromptInput from './PromptInput';
import HeroTitle from './HeroTitle';
import { usePromptSubmit } from './hooks/usePromptSubmit';
import { ChevronDown, Sparkles, Zap, Globe } from 'lucide-react';

const Hero: React.FC = React.memo(() => {
  const { handlePromptSubmit } = usePromptSubmit();

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20 overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orb */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Secondary gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/15 via-blue-500/10 to-cyan-400/15 rounded-full blur-2xl animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-1/3 left-1/5 w-48 h-48 bg-gradient-to-br from-cyan-500/20 via-blue-400/10 to-purple-500/15 rounded-full blur-2xl animate-[pulse_6s_ease-in-out_infinite]"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/3 animate-float">
          <Sparkles className="w-4 h-4 text-blue-400/60" />
        </div>
        <div className="absolute top-2/3 right-1/3 animate-float" style={{ animationDelay: '2s' }}>
          <Zap className="w-5 h-5 text-purple-400/60" />
        </div>
        <div className="absolute bottom-1/4 left-1/2 animate-float" style={{ animationDelay: '4s' }}>
          <Globe className="w-4 h-4 text-cyan-400/60" />
        </div>
      </div>

      <div className="container mx-auto px-4 flex-1 flex flex-col justify-center relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <HeroTitle />
          
          {/* Statistics */}
          <div className="flex justify-center items-center gap-16 mb-16 text-gray-400">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">65k+</div>
              <div className="text-sm uppercase tracking-wider">Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">300k+</div>
              <div className="text-sm uppercase tracking-wider">Apps Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">1.5M+</div>
              <div className="text-sm uppercase tracking-wider">Lines of Code</div>
            </div>
          </div>

          <div className="mb-12">
            <PromptInput onSubmit={handlePromptSubmit} />
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-6 mb-16">
            <button className="bg-gray-800/60 border border-gray-600/30 text-white px-8 py-4 rounded-full hover:bg-gray-700/60 transition-all duration-300 backdrop-blur-sm font-medium">
              View Examples
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-blue-500/25">
              Try Demo
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Build applications in minutes, not months</p>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 backdrop-blur-sm">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-400 text-sm">Advanced AI that understands your vision</p>
            </div>
            <div className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700/30 backdrop-blur-sm">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Deploy Anywhere</h3>
              <p className="text-gray-400 text-sm">One-click deployment to any platform</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToNextSection}
          className="text-gray-500 hover:text-blue-400 transition-all duration-300 hover:transform hover:translate-y-1"
          aria-label="Прокрутить вниз"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;
