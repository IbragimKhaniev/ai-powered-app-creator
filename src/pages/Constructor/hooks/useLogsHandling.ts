
import { useState, useCallback, useEffect } from 'react';
import { useGetApplicationsApplicationIdLogs } from '@/api/core';

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

  const handleTryFixLog = useCallback((logContent: string) => {
    console.log(`Attempting to fix: ${logContent}`);
  }, []);

  return {
    logs: logsData?.logs?.reverse() || [],
    isLoadingLogs,
    handleTryFixLog
  };
};
