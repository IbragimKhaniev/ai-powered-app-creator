import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { LogEntry } from '../../types';
import { formatTime, isErrorOrWarning, cleanLogMessage } from '../../utils/formatUtils';
import { renderLogLevel } from '../../utils/logUtils';
import Header from '../Header';
import ActionsDropdown from '../ActionsDropdown';
import { CONSTRUCTOR_TEXT } from '../../constants';
import { Loader2 } from "lucide-react";

interface LogsPanelProps {
  logs: LogEntry[];
  onToggleLogs: () => void;
  onTryFixLog: (content: string) => void;
  isLoading?: boolean;
  isDeploying?: boolean;
  isSendingFixMessage?: boolean;
}

const LogsPanel: React.FC<LogsPanelProps> = ({ 
  logs, 
  onToggleLogs, 
  onTryFixLog,
  isLoading = false,
  isSendingFixMessage = false,
  isDeploying = false,
}) => {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4 flex justify-between items-center bg-white">
        <Header 
          title={CONSTRUCTOR_TEXT.LOGS} 
          description={CONSTRUCTOR_TEXT.LOGS_DESCRIPTION} 
          showBackButton={true}
          onBackClick={onToggleLogs}
        />
        <ActionsDropdown 
          showLogs={true} 
          onToggleLogs={onToggleLogs}
          domain=""
        />
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-gray-50">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 text-primary animate-spin mr-2" />
            <p className="text-lg text-muted-foreground">Загрузка логов...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg text-muted-foreground">Нет доступных логов</p>
          </div>
        ) : (
          <div className="space-y-2">
            {isDeploying && (
              <div className="font-mono text-sm bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                Деплоится ...
              </div>
            )}
            {logs.map((log) => (
              <div key={log._id} className="font-mono text-sm bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between">
                    <div>
                      {renderLogLevel(log.content)} 
                      <span className="ml-2">{cleanLogMessage(log.content)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {log.createdAt}
                    </div>
                  </div>
 
                  {isErrorOrWarning(log) && (
                    <Button 
                      onClick={() => onTryFixLog(log.content)}
                      className="bg-brand-purple hover:bg-purple-700 text-white mt-1 self-start rounded-full"
                      size="sm"
                      disabled={isSendingFixMessage}
                    >
                      {isSendingFixMessage ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          {CONSTRUCTOR_TEXT.FIXING}
                        </>
                      ) : (
                        CONSTRUCTOR_TEXT.TRY_TO_FIX
                      )}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LogsPanel;
