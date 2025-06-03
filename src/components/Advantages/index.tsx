
import React from 'react';
import { Code2, Rocket, Shield, Users } from 'lucide-react';

const Advantages: React.FC = React.memo(() => {
  const advantages = [
    {
      icon: Code2,
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, and the latest web technologies for optimal performance.'
    },
    {
      icon: Rocket,
      title: 'Rapid Development',
      description: 'From concept to deployment in record time with our AI-powered development platform.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security measures to protect your applications and user data.'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'Work seamlessly with your team using built-in collaboration tools and version control.'
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the future of application development with cutting-edge tools and AI assistance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div 
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Advantages.displayName = 'Advantages';

export default Advantages;
