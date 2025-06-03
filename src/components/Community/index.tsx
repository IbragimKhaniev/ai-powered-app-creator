
import React from 'react';
import { Star, GitBranch, Download, Heart } from 'lucide-react';

const Community: React.FC = React.memo(() => {
  const stats = [
    { icon: Star, value: '12.5k', label: 'GitHub Stars' },
    { icon: GitBranch, value: '2.1k', label: 'Forks' },
    { icon: Download, value: '500k+', label: 'Downloads' },
    { icon: Heart, value: '98%', label: 'User Satisfaction' }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Connect with thousands of developers who are building the future with AI-powered tools.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300 shadow-lg">
            Join the Community
          </button>
        </div>
      </div>
    </section>
  );
});

Community.displayName = 'Community';

export default Community;
