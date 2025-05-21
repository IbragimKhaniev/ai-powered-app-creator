
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { CONSTRUCTOR_TEXT } from '../../constants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  compact?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "", 
  description,
  showBackButton = false, 
  onBackClick,
  compact = false
}) => {
  return (
    <div className="flex items-center justify-between w-full">
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
        {title && (
          <span className={`${compact ? "text-xs text-muted-foreground" : "text-xl font-bold"}`}>
            {title}
          </span>
        )}
        {description && !compact && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Меню</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link to="/profile">Перейти в профиль</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
