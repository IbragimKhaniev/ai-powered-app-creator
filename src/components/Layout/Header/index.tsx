
import React, { useMemo } from 'react';
import { useScrollPosition } from '@/utils/hooks';
import { NAVIGATION } from '@/config/constants';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

const Header: React.FC = React.memo(() => {
  const scrollPosition = useScrollPosition();
  
  const headerClasses = useMemo(() => {
    return cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      'py-4 px-6 md:px-8 flex items-center justify-between',
      scrollPosition > 10 ? 'bg-white shadow-md' : 'bg-transparent'
    );
  }, [scrollPosition]);

  return (
    <header className={headerClasses}>
      <Logo />
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm">{NAVIGATION.LOG_IN}</Button>
        <Button variant="primary" size="sm">{NAVIGATION.GET_STARTED}</Button>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;
