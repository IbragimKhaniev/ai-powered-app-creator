
import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONSTANTS } from '@/config/constants';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = React.memo(({ className = '', showText = true }) => {
  return (
    <Link to="/" className={`flex items-center gap-1 ${className}`}>
      <div className="text-brand-red text-2xl">❤</div>
      {showText && (
        <span className="font-semibold text-lg">{SITE_CONSTANTS.SITE_NAME}</span>
      )}
    </Link>
  );
});

Logo.displayName = 'Logo';

export default Logo;
