
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CONSTRUCTOR_TEXT } from '../../constants';

interface HeaderProps {
  title: string;
  description: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  description, 
  showBackButton = false, 
  onBackClick 
}) => {
  return (
    <div className="flex items-center">
      {showBackButton && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2" 
          onClick={onBackClick}
          asChild={!onBackClick}
        >
          {onBackClick ? (
            <span onClick={onBackClick}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">{CONSTRUCTOR_TEXT.BACK_TO_PROFILE}</span>
            </span>
          ) : (
            <Link to="/profile">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">{CONSTRUCTOR_TEXT.BACK_TO_PROFILE}</span>
            </Link>
          )}
        </Button>
      )}
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Header;
