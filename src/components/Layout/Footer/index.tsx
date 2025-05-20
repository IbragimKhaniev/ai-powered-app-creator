
import React from 'react';
import Logo from '@/components/Logo';
import { SITE_CONSTANTS } from '@/config/constants';

const Footer: React.FC = React.memo(() => {
  return (
    <footer className="bg-white py-10 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center h-full">
          <Logo className="mb-2" />
          <p className="text-sm text-muted-foreground">
            © {SITE_CONSTANTS.COPYRIGHT_YEAR} {SITE_CONSTANTS.SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
