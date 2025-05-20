
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Log } from '../../types';
import LogItem from '../LogItem';

interface LogsListProps {
  logs: Log[];
}

const LogsList: React.FC<LogsListProps> = React.memo(({ logs }) => {
  return (
    <ScrollArea className="flex-1 p-4 bg-gray-50">
      <div className="space-y-2">
        {logs.map((log) => (
          <LogItem key={log.id} log={log} />
        ))}
      </div>
    </ScrollArea>
  );
});

LogsList.displayName = 'LogsList';

export default LogsList;
