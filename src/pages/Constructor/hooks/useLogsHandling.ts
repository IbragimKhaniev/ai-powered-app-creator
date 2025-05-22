
import { useState, useCallback, useEffect } from 'react';
import { useGetApplicationsApplicationIdLogs } from '@/api/core';
import { LogEntry } from '../types';
import { IMongoModelLog } from '@/api/core/types';

export const useLogsHandling = (applicationId: string | null, showLogs: boolean) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Get application logs
  const { data: logsData, isLoading: isLoadingLogs } = useGetApplicationsApplicationIdLogs(
    applicationId || '',
    {
      query: {
        enabled: !!applicationId && showLogs,
        refetchInterval: showLogs ? 5000 : false,
      }
    }
  );

  // Update logs when data changes
  useEffect(() => {
    if (logsData?.logs && logsData.logs.length > 0) {
      const formattedLogs: LogEntry[] = logsData.logs.map((log: IMongoModelLog) => ({
        id: log._id || `log-${Date.now()}-${Math.random()}`,
        content: log.content || '',
        timestamp: log.createdAt ? new Date(log.createdAt) : new Date()
      }));
      setLogs(formattedLogs);
    }
  }, [logsData]);

  const handleTryFixLog = useCallback((logContent: string) => {
    console.log(`Attempting to fix: ${logContent}`);
  }, []);

  return {
    logs,
    isLoadingLogs,
    handleTryFixLog
  };
};
