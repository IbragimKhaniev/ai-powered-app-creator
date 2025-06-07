
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface ScrollToBottomButtonProps {
  onClick: () => void;
  visible: boolean;
}

const ScrollToBottomButton: React.FC<ScrollToBottomButtonProps> = ({ onClick, visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <Button
        onClick={onClick}
        size="icon"
        className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <ArrowDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ScrollToBottomButton;
