
import React from 'react';
import { Log } from '../../types';
import { formatTime, renderLogLevel } from '../../utils';

interface LogItemProps {
  log: Log;
}

const LogItem: React.FC<LogItemProps> = React.memo(({ log }) => {
  return (
    <div className="font-mono text-sm bg-white p-3 rounded-md border">
      <div className="flex justify-between">
        <div>
          {renderLogLevel(log.content)} 
          <span className="ml-2">{log.content.replace(/\[(INFO|WARNING|ERROR|DEBUG)\]\s/, '')}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {formatTime(log.timestamp)}
        </div>
      </div>
    </div>
  );
});

LogItem.displayName = 'LogItem';

export default LogItem;
