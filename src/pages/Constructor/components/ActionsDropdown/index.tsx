
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, Logs } from "lucide-react";
import { CONSTRUCTOR_TEXT } from '../../constants';

interface ActionsDropdownProps {
  showLogs: boolean;
  onToggleLogs: () => void;
}

const ActionsDropdown: React.FC<ActionsDropdownProps> = ({ 
  showLogs, 
  onToggleLogs 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary transition-all duration-200"
        >
          {CONSTRUCTOR_TEXT.ACTIONS}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-[220px] rounded-xl p-1 border-primary/10 shadow-lg bg-white/95 backdrop-blur-sm"
      >
        <DropdownMenuItem className="rounded-lg py-2.5 px-3 cursor-pointer hover:bg-primary/5 focus:bg-primary/5 transition-colors">
          <RefreshCw className="mr-3 h-4 w-4 text-primary" />
          <span>{CONSTRUCTOR_TEXT.RESTART_SERVER}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="rounded-lg py-2.5 px-3 cursor-pointer hover:bg-primary/5 focus:bg-primary/5 transition-colors">
          <ExternalLink className="mr-3 h-4 w-4 text-primary" />
          <span>{CONSTRUCTOR_TEXT.OPEN_NEW_TAB}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={onToggleLogs}
          className="rounded-lg py-2.5 px-3 cursor-pointer hover:bg-primary/5 focus:bg-primary/5 transition-colors"
        >
          <Logs className={`mr-3 h-4 w-4 ${showLogs ? 'text-brand-khaki' : 'text-primary'}`} />
          <span className={showLogs ? 'text-brand-khaki font-medium' : ''}>
            {showLogs ? CONSTRUCTOR_TEXT.HIDE_LOGS : CONSTRUCTOR_TEXT.SHOW_LOGS}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropdown;
