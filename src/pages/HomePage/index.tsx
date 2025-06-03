
import React, { useEffect } from 'react';
import { useDocumentTitle } from '@/utils/hooks';
import Header from '@/components/Layout/Header';
import Hero from '@/components/Hero';
import Advantages from '@/components/Advantages';
import Community from '@/components/Community';
import Footer from '@/components/Layout/Footer';
import { HOME_PAGE_CONSTANTS } from './constants';

const HomePage: React.FC = React.memo(() => {
  // Set document title when component mounts
  useDocumentTitle(HOME_PAGE_CONSTANTS.PAGE_TITLE);
  
  // Log page view for analytics (placeholder)
  useEffect(() => {
    console.log('HomePage viewed');
    // Here you would typically track page view with analytics
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Advantages />
        <Community />
      </main>
      <Footer />
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
