
import { useState, useCallback, useEffect, useMemo } from 'react';
import { IMongoModelLog, useGetApplicationsApplicationIdLogs, usePostApplicationsApplicationIdMessages } from '@/api/core';
import { useToast } from '@/hooks/use-toast';

export const useLogsHandling = (applicationId: string | null, showLogs: boolean) => {
  const { toast } = useToast();
  
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

  // Send message mutation for fixing logs
  const { mutate: sendFixMessage, isPending: isSendingFixMessage } = usePostApplicationsApplicationIdMessages({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Запрос на исправление отправлен",
          description: "AI анализирует ошибку и предложит решение",
        });
      },
      onError: (error) => {
        console.error("Error sending fix message:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось отправить запрос на исправление",
          variant: "destructive",
        });
      }
    }
  });

  const handleTryFixLog = useCallback((content: string) => {
    console.log(`Attempting to fix: ${content}`);
    
    if (!applicationId) {
      toast({
        title: "Ошибка",
        description: "Отсутствует ID приложения",
        variant: "destructive",
      });
      return;
    }
    
    sendFixMessage({
      applicationId,
      data: { 
        content: "Исправь ошибку",
        additionalContent: content
      }
    });
  }, [applicationId, sendFixMessage, toast]);

  const logsParsed = useMemo(() => {
    if (logsData?.logs) {
      return [...logsData.logs].reverse();
    }

    return [];
  }, [logsData?.logs]);

  return {
    logs: logsParsed,
    isLoadingLogs,
    handleTryFixLog,
    isSendingFixMessage
  };
};
