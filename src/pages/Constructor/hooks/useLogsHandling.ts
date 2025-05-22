
import { useState, useCallback, useEffect } from 'react';
import { IMongoModelLog, useGetApplicationsApplicationIdLogs } from '@/api/core';

export const useLogsHandling = (applicationId: string | null, showLogs: boolean) => {
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

  const handleTryFixLog = useCallback((log: IMongoModelLog) => {
    console.log(`Attempting to fix: ${log.content}`);
  }, []);

  return {
    logs: logsData?.logs?.reverse() || [],
    isLoadingLogs,
    handleTryFixLog
  };
};
