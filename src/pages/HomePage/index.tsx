
import React from 'react';
import Header from '@/components/Layout/Header';
import Hero from '@/components/Hero';
import Community from '@/components/Community';
import Footer from '@/components/Layout/Footer';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Community />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
