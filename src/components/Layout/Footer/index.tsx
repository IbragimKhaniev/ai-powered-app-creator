
import React from 'react';
import { FOOTER_SECTIONS } from '@/config/constants';
import Logo from '@/components/Logo';
import FooterSection from './FooterSection';

const Footer: React.FC = React.memo(() => {
  return (
    <footer className="bg-white py-10 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="flex flex-col">
            <Logo className="mb-4" />
          </div>
          <FooterSection 
            title={FOOTER_SECTIONS.COMPANY.TITLE} 
            links={FOOTER_SECTIONS.COMPANY.LINKS} 
          />
          <FooterSection 
            title={FOOTER_SECTIONS.PRODUCT.TITLE} 
            links={FOOTER_SECTIONS.PRODUCT.LINKS} 
          />
          <FooterSection 
            title={FOOTER_SECTIONS.RESOURCES.TITLE} 
            links={FOOTER_SECTIONS.RESOURCES.LINKS} 
          />
          <FooterSection 
            title={FOOTER_SECTIONS.LEGAL.TITLE} 
            links={FOOTER_SECTIONS.LEGAL.LINKS} 
          />
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
