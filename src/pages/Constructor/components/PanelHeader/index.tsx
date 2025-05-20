
import React, { useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, Logs, ArrowLeft } from "lucide-react";
import { CONSTRUCTOR_CONSTANTS } from '../../constants';

interface PanelHeaderProps {
  showLogs: boolean;
  onToggleLogs: () => void;
}

const PanelHeader: React.FC<PanelHeaderProps> = React.memo(({ showLogs, onToggleLogs }) => {
  const handleRefreshServer = useCallback(() => {
    console.log('Restarting server...');
  }, []);

  const handleOpenNewTab = useCallback(() => {
    console.log('Opening in new tab...');
  }, []);

  return (
    <div className="border-b p-4 flex justify-between items-center">
      <div className="flex items-center">
        {showLogs && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleLogs} 
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Назад</span>
          </Button>
        )}
        <div>
          <h2 className="text-xl font-bold">
            {showLogs ? CONSTRUCTOR_CONSTANTS.LOGS_TITLE : CONSTRUCTOR_CONSTANTS.PREVIEW_TITLE}
          </h2>
          <p className="text-sm text-muted-foreground">
            {showLogs 
              ? CONSTRUCTOR_CONSTANTS.LOGS_DESCRIPTION
              : CONSTRUCTOR_CONSTANTS.PREVIEW_DESCRIPTION}
          </p>
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            Действия
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem onClick={handleRefreshServer}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {CONSTRUCTOR_CONSTANTS.DROPDOWN_ACTIONS.RESTART}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenNewTab}>
            <ExternalLink className="mr-2 h-4 w-4" />
            {CONSTRUCTOR_CONSTANTS.DROPDOWN_ACTIONS.OPEN_NEW_TAB}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onToggleLogs}>
            <Logs className="mr-2 h-4 w-4" />
            {showLogs 
              ? CONSTRUCTOR_CONSTANTS.DROPDOWN_ACTIONS.LOGS.HIDE
              : CONSTRUCTOR_CONSTANTS.DROPDOWN_ACTIONS.LOGS.SHOW}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});

PanelHeader.displayName = 'PanelHeader';

export default PanelHeader;
