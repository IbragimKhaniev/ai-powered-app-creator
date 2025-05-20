
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
        <Button variant="outline" size="sm" className="rounded-full">
          {CONSTRUCTOR_TEXT.ACTIONS}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] rounded-xl">
        <DropdownMenuItem>
          <RefreshCw className="mr-2 h-4 w-4" />
          {CONSTRUCTOR_TEXT.RESTART_SERVER}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ExternalLink className="mr-2 h-4 w-4" />
          {CONSTRUCTOR_TEXT.OPEN_NEW_TAB}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onToggleLogs}>
          <Logs className="mr-2 h-4 w-4" />
          {showLogs ? CONSTRUCTOR_TEXT.HIDE_LOGS : CONSTRUCTOR_TEXT.SHOW_LOGS}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropdown;
